import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  AddCard,
  CreateCustomer,
  CreateSubscription,
  RemoveCard,
  UpdateSubscription,
} from './dto/stripe.dto';
import { setValue } from 'helpers/utils';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });
  }

  /**
   * This method will create a customer account in stripe
   * @param data
   * @returns
   */
  async createCustomer(data: CreateCustomer) {
    try {
      const customer = await this.stripe.customers.create({
        email: setValue(data.email),
        metadata: {
          user_id: setValue(data.user_id),
          user_email: setValue(data.email),
        },
      });
      return { ...customer, status: true };
    } catch (err) {
      return { ...err, status: false };
    }
  }

  /**
   * This method will add card to the customer in stripe
   * @param data
   * @returns
   */
  async addCard(data: AddCard) {
    try {
      const addCard = await this.stripe.customers.createSource(
        data.customer_id,
        { source: data.token },
      );
      return { status: true, ...addCard };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will remove card to the customer from stripe
   * @param data
   * @returns
   */
  async removeCard(data: RemoveCard) {
    try {
      const deleteCard = await this.stripe.customers.deleteSource(
        data.customer_id,
        data.card_id,
      );
      return { status: true, ...deleteCard };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will update customer card information
   * @param customerId
   * @param cardToken
   * @returns
   */
  async updateCard(customerId: string, cardToken: string) {
    try {
      const customer = await this.stripe.customers.update(customerId, {
        source: cardToken,
      });
      return { status: true, ...customer };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will create a new subscription
   * @param data
   * @returns
   */
  async createSubscription(data: CreateSubscription, user_id: number) {
    try {
      const createSubscription = await this.stripe.subscriptions.create({
        customer: data.customer_id,
        items: [{ price: data.price_id }],
        metadata: {
          user_id,
        },
      });
      return { ...createSubscription, status: true };
    } catch (err) {
      return { ...err, status: false };
    }
  }

  /**
   * This method will pause the payment process of subscription
   * @param data
   * @returns
   */
  async pauseSubscription(data: UpdateSubscription) {
    try {
      const pauseSubscription = await this.stripe.subscriptions.update(
        data.subscription_id,
        {
          cancel_at_period_end: true,
        },
      );
      return { status: true, ...pauseSubscription };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will resume the payment process of subscription
   * @param data
   * @returns
   */
  async resumeSubscription(data: UpdateSubscription) {
    try {
      const resumeSubscription = await this.stripe.subscriptions.update(
        data.subscription_id,
        {
          cancel_at_period_end: false,
        },
      );
      return { status: true, ...resumeSubscription };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will cancle the payment process of subscription
   * @param data
   * @returns
   */
  async cancleSubscription(data: UpdateSubscription) {
    try {
      const cancleSubscription = await this.stripe.subscriptions.cancel(
        data.subscription_id,
        {
          cancellation_details: {
            comment: 'manually-canceled',
          },
        },
      );

      return { ...cancleSubscription, status: true };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will cancle the payment process of subscription when period expires
   * @param data
   * @returns
   */
  async cancleSubscriptionAtPeriodEnd(data: UpdateSubscription) {
    try {
      const cancleSubscription = await this.stripe.subscriptions.update(
        data.subscription_id,
        {
          cancel_at_period_end: true,
        },
      );

      return { ...cancleSubscription, status: true };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will return product information
   * @param data
   * @returns
   */
  async getProduct(product_id: string) {
    try {
      const product = await this.stripe.products.retrieve(product_id);
      return { status: true, ...product };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will return subscription information
   * @param data
   * @returns
   */
  async getSubs(subscription_id) {
    try {
      const subs = await this.stripe.subscriptions.retrieve(subscription_id);
      return { status: true, ...subs };
    } catch (err) {
      return { status: false, ...err };
    }
  }

  /**
   * This method will return invoice information
   * @param invoiceId
   * @returns
   */
  async getInvoice(invoiceId: string) {
    const invoice = await this.stripe.invoices.retrieve(invoiceId);
    return invoice;
  }
}
