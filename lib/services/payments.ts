import { stripe } from '@/lib/payments/stripe'
import { supabase } from '@/lib/supabase'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

export interface CreatePaymentIntent {
  amount: number
  currency?: string
  payment_method_types?: string[]
  description?: string
  metadata?: Record<string, string>
}

export interface CreateSubscription {
  customerId: string
  priceId: string
  metadata?: Record<string, string>
}

export async function createPaymentIntent({
  amount,
  currency = 'usd',
  payment_method_types = ['card'],
  description,
  metadata
}: CreatePaymentIntent) {
  return stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency,
    payment_method_types,
    description,
    metadata
  })
}

export async function createCustomer(email: string, metadata?: Record<string, string>) {
  return stripe.customers.create({
    email,
    metadata
  })
}

export async function createSubscription({ customerId, priceId, metadata }: CreateSubscription) {
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    metadata
  })
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId)
}

export async function getPaymentMethods(customerId: string) {
  return stripe.paymentMethods.list({
    customer: customerId,
    type: 'card'
  })
}

export async function attachPaymentMethod(customerId: string, paymentMethodId: string) {
  return stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId
  })
}

export async function detachPaymentMethod(paymentMethodId: string) {
  return stripe.paymentMethods.detach(paymentMethodId)
}

export async function createRefund(paymentIntentId: string, amount?: number) {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount: amount ? Math.round(amount * 100) : undefined // Convert to cents if specified
  })
}

export async function savePaymentRecord(
  userId: string,
  data: {
    tenant_id: string
    property_id: string
    payment_amount: number
    payment_type: string
    payment_method: string
    payment_status: string
    stripe_payment_intent_id?: string
    description?: string
  }
) {
  const { data: payment, error } = await supabase
    .from('payments')
    .insert([
      {
        user_id: userId,
        ...data,
        payment_date: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) throw error
  return payment
}

export async function updatePaymentStatus(
  paymentId: string,
  status: string,
  stripeEvent?: Record<string, any>
) {
  const { data: payment, error } = await supabase
    .from('payments')
    .update({
      payment_status: status,
      stripe_event: stripeEvent,
      updated_at: new Date().toISOString()
    })
    .eq('id', paymentId)
    .select()
    .single()

  if (error) throw error
  return payment
}

export async function getPaymentHistory(
  userId: string,
  filters?: {
    tenant_id?: string
    property_id?: string
    payment_type?: string
    payment_status?: string
    start_date?: string
    end_date?: string
  }
) {
  let query = supabase
    .from('payments')
    .select('*, tenants(*), properties(*)')
    .eq('user_id', userId)
    .order('payment_date', { ascending: false })

  if (filters) {
    const { tenant_id, property_id, payment_type, payment_status, start_date, end_date } = filters

    if (tenant_id) query = query.eq('tenant_id', tenant_id)
    if (property_id) query = query.eq('property_id', property_id)
    if (payment_type) query = query.eq('payment_type', payment_type)
    if (payment_status) query = query.eq('payment_status', payment_status)
    if (start_date) query = query.gte('payment_date', start_date)
    if (end_date) query = query.lte('payment_date', end_date)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}
