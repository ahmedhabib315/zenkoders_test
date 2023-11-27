import { PrismaService } from '@libs/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { StripeService } from 'src/stripe/stripe.service';
import { Token } from './dto/payments.dto';
import { format } from 'date-fns';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  /**
   * This method add card information to the customer in stripe, create a new subscription, add payment details and payments
   * @param user_id
   * @param token
   * @returns
   */
  async subscription(user_id: number, data: Token) {
    let addCard: any;
    const user = await this.prisma.users.findUnique({
      where: {
        id: user_id,
      },
    });

    const user_details = await this.prisma.userDetails.findFirst({
      where: {
        user_id,
      },
    });

    if (data.token) {
      const createCardData = {
        customer_id: user_details.customer_id,
        token: data.token,
      };

      addCard = await this.stripeService.addCard(createCardData);

      if (addCard.status) {
        // Create Subscription from plans
        const get_package = await this.getPackageInfo(data.package_name);

        if (!get_package) {
          throw new Error(
            "1: Can't create subscription, please try again later",
          );
        }

        const subcsription = await this.stripeService.createSubscription(
          {
            customer_id: user_details.customer_id,
            price_id: get_package.price_id,
          },
          user_id,
        );

        if (!subcsription.status) {
          throw new Error(
            "2: Can't create subscription, please try again later",
          );
        }

        await this.prisma.userDetails.update({
          where: {
            id: user_details.id,
          },
          data: {
            is_subscribed: true,
            card_id: addCard.id,
            exp_month: addCard.exp_month + '',
            exp_year: addCard.exp_year + '',
            object: addCard.object,
            brand: addCard.brand,
            last4: addCard.last4,
            price_id: get_package.price_id,
            product_id: get_package.product_id,
            subscription_id: subcsription.id,
          },
        });

        const payment = await this.prisma.payments.create({
          data: {
            user_id: user_id,
            invoice_id: subcsription.latest_invoice,
            renewal_period: subcsription.plan.interval,
            month_count: 1,
            amount: subcsription.plan.amount / 100,
            start_at: format(
              new Date(subcsription.current_period_start * 1000),
              'yyyy-MM-dd HH:mm:ss',
            ),
            end_at: format(
              new Date(subcsription.current_period_end * 1000),
              'yyyy-MM-dd HH:mm:ss',
            ),
            currency: subcsription.currency,
            status: subcsription ? true : false,
          },
        });

        return {
          status: true,
          message: `Subscribed successfully subscribed`,
          data: {
            status: true,
            data: { ...payment },
          },
        };
      } else {
        throw new ForbiddenException('Card failed to add');
      }
    }
  }

  async getPackageInfo(package_name: string) {
    return await this.prisma.packages.findFirst({
      where: {
        package_name,
      },
    });
  }
}
