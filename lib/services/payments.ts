import { stripe } from '@/lib/payments/stripe'
import supabase from '@/lib/supabase'
import { z } from 'zod'

// Validation schemas
const paymentMethodSchema = z.object({
  type: z.enum(['card', 'ach_debit', 'check', 'cash', 'bank_transfer']),
  customer_id: z.string(),
  metadata: z.record(z.string()).optional()
})

const paymentIntentSchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().length(3).default('usd'),
  payment_method: z.string(),
  customer_id: z.string(),
  metadata: z.record(z.string()).optional(),
  description: z.string().optional()
})

export class PaymentServiceError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500
  ) {
    super(message)
    this.name = 'PaymentServiceError'
  }
}

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

export async function createPaymentIntent(data: z.infer<typeof paymentIntentSchema>) {
  try {
    const validated = paymentIntentSchema.parse(data)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validated.amount * 100),
      currency: validated.currency,
      payment_method: validated.payment_method,
      customer: validated.customer_id,
      metadata: validated.metadata,
      description: validated.description,
      confirmation_method: 'manual',
      confirm: false
    })

    return paymentIntent
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new PaymentServiceError('Invalid payment intent data', 'VALIDATION_ERROR', 400)
    }
    throw error
  }
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
  paymentIntentId: string,
  status: 'succeeded' | 'failed' | 'refunded' | 'canceled',
  metadata?: Record<string, unknown>
) {
  const { data, error } = await supabase
    .from('payments')
    .update({
      status,
      metadata: metadata || {},
      updated_at: new Date().toISOString()
    })
    .eq('payment_intent_id', paymentIntentId)
    .select()
    .single()

  if (error) {
    throw new PaymentServiceError('Failed to update payment status', 'UPDATE_FAILED', 500)
  }

  return data
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

export async function createPaymentMethod(data: z.infer<typeof paymentMethodSchema>) {
  try {
    const validated = paymentMethodSchema.parse(data)

    let paymentMethod
    switch (validated.type) {
      case 'card':
        paymentMethod = await stripe.paymentMethods.create({
          type: 'card',
          metadata: validated.metadata
        })
        await stripe.paymentMethods.attach(paymentMethod.id, {
          customer: validated.customer_id
        })
        break

      case 'ach_debit':
        // Handle ACH payment method creation
        break

      default:
        // Handle other payment method types
        break
    }

    const { data: savedMethod, error } = await supabase
      .from('payment_methods')
      .insert([
        {
          type: validated.type,
          customer_id: validated.customer_id,
          stripe_payment_method_id: paymentMethod?.id,
          metadata: validated.metadata,
          status: 'active'
        }
      ])
      .select()
      .single()

    if (error) {
      throw new PaymentServiceError('Failed to save payment method', 'SAVE_FAILED', 500)
    }

    return savedMethod
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new PaymentServiceError('Invalid payment method data', 'VALIDATION_ERROR', 400)
    }
    throw error
  }
}

export async function confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId
    })

    if (paymentIntent.status === 'requires_action') {
      throw new PaymentServiceError(
        'Payment requires additional authentication',
        'REQUIRES_ACTION',
        402
      )
    }

    return paymentIntent
  } catch (error) {
    if (error instanceof stripe.errors.StripeError) {
      throw new PaymentServiceError(
        error.message,
        error.code || 'STRIPE_ERROR',
        error.statusCode || 500
      )
    }
    throw error
  }
}

export async function refundPayment(
  paymentIntentId: string,
  options?: {
    amount?: number
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
  }
) {
  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: options?.amount ? Math.round(options.amount * 100) : undefined,
      reason: options?.reason
    })

    await updatePaymentStatus(paymentIntentId, 'refunded', {
      refund_id: refund.id,
      amount: refund.amount / 100,
      status: refund.status
    })

    return refund
  } catch (error) {
    if (error instanceof stripe.errors.StripeError) {
      throw new PaymentServiceError(
        error.message,
        error.code || 'REFUND_FAILED',
        error.statusCode || 500
      )
    }
    throw error
  }
}

export async function listPaymentMethods(customerId: string) {
  const methods = await stripe.paymentMethods.list({
    customer: customerId,
    type: 'card'
  })

  return methods.data
}

export async function deletePaymentMethod(paymentMethodId: string) {
  try {
    await stripe.paymentMethods.detach(paymentMethodId)

    const { error } = await supabase
      .from('payment_methods')
      .delete()
      .eq('stripe_payment_method_id', paymentMethodId)

    if (error) {
      throw new PaymentServiceError(
        'Failed to delete payment method from database',
        'DELETE_FAILED',
        500
      )
    }
  } catch (error) {
    if (error instanceof stripe.errors.StripeError) {
      throw new PaymentServiceError(
        error.message,
        error.code || 'STRIPE_ERROR',
        error.statusCode || 500
      )
    }
    throw error
  }
}
