import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-01-27.acacia',
  typescript: true,
});

export const createStripeCustomer = async ({
  email,
  name,
  metadata,
}: {
  email: string;
  name: string;
  metadata: Record<string, string>;
}) => {
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
}: {
  amount: number;
  currency?: string;
  customer: string;
  metadata: Record<string, string>;
}) => {
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
