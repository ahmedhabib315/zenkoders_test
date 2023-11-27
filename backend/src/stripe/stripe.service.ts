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
}
