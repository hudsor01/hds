import Stripe from 'stripe'

if (!process.env['STRIPE_SECRET_KEY']) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'], {
  apiVersion: '2025-01-27.acacia',
  typescript: true
})

export interface CreateCustomerParams {
  email: string
  name: string
  metadata: Record<string, string>
}

export interface CreatePaymentIntentParams {
  amount: number
  currency?: string
  customer: string
  metadata: Record<string, string>
}

export const createStripeCustomer = async ({ email, name, metadata }: CreateCustomerParams): Promise<Stripe.Customer> => {
  return stripe.customers.create({
    email,
    name,
    metadata
  })
}

export const createPaymentIntent = async ({
  amount,
  currency = 'usd',
  customer,
  metadata
}: CreatePaymentIntentParams): Promise<Stripe.PaymentIntent> => {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    customer,
    metadata,
    automatic_payment_methods: {
      enabled: true
    }
  })
}

// Webhook utilities
export const constructWebhookEvent = (payload: string | Buffer, signature: string, webhookSecret: string): Stripe.Event => {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}

// Customer utilities
export const retrieveCustomer = async (customerId: string): Promise<Stripe.Customer | Stripe.DeletedCustomer> => {
  return stripe.customers.retrieve(customerId)
}

export const updateCustomer = async (customerId: string, data: Stripe.CustomerUpdateParams): Promise<Stripe.Customer> => {
  return stripe.customers.update(customerId, data)
}

// Payment utilities
export const retrievePaymentIntent = async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
  return stripe.paymentIntents.retrieve(paymentIntentId)
}

export const cancelPaymentIntent = async (paymentIntentId: string): Promise<Stripe.PaymentIntent> => {
  return stripe.paymentIntents.cancel(paymentIntentId)
}

// Subscription utilities
export const createSubscription = async (
  customerId: string,
  priceId: string,
  metadata?: Record<string, string>
): Promise<Stripe.Subscription> => {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata: metadata || {}
  })
}

export const cancelSubscription = async (subscriptionId: string): Promise<Stripe.Subscription> => {
  return stripe.subscriptions.cancel(subscriptionId)
}
