import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
});

export interface CreateCustomerParams {
  email: string;
  name: string;
  metadata: Record<string, string>;
}

export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  customer: string;
  metadata: Record<string, string>;
}

export const createStripeCustomer = async ({email, name, metadata}: CreateCustomerParams) => {
  return stripe.customers.create({
    email,
    name,
    metadata,
  });
};

export const createPaymentIntent = async ({
  amount,
  currency = 'usd',
  customer,
  metadata,
}: CreatePaymentIntentParams) => {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    customer,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });
};

// Webhook utilities
export const constructWebhookEvent = (
  payload: string | Buffer,
  signature: string,
  webhookSecret: string,
) => {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
};

// Customer utilities
export const retrieveCustomer = async (customerId: string) => {
  return stripe.customers.retrieve(customerId);
};

export const updateCustomer = async (customerId: string, data: Stripe.CustomerUpdateParams) => {
  return stripe.customers.update(customerId, data);
};

// Payment utilities
export const retrievePaymentIntent = async (paymentIntentId: string) => {
  return stripe.paymentIntents.retrieve(paymentIntentId);
};

export const cancelPaymentIntent = async (paymentIntentId: string) => {
  return stripe.paymentIntents.cancel(paymentIntentId);
};

// Subscription utilities
export const createSubscription = async (
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>,
) => {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{price: priceId}],
    metadata,
  });
};

export const cancelSubscription = async (subscriptionId: string) => {
  return stripe.subscriptions.cancel(subscriptionId);
};
