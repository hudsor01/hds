import { stripe } from '@/lib/payments/stripe'
import { supabase } from '@/lib/supabase'

export interface RecurringPaymentConfig {
  tenant_id: string
  property_id: string
  amount: number
  frequency: 'monthly' | 'weekly' | 'yearly'
  payment_day: number
  payment_method_id: string
  description?: string
  metadata?: Record<string, string>
}

export async function setupRecurringPayment(userId: string, config: RecurringPaymentConfig) {
  // Create a subscription schedule in Stripe
  const schedule = await stripe.subscriptionSchedules.create({
    customer: config.tenant_id,
    start_date: getNextPaymentDate(config.payment_day, config.frequency),
    end_behavior: 'release',
    phases: [
      {
        items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: config.description || 'Recurring Payment',
                metadata: config.metadata,
              },
              recurring: {
                interval:
                  config.frequency === 'yearly'
                    ? 'year'
                    : config.frequency === 'weekly'
                      ? 'week'
                      : 'month',
                interval_count: 1,
              },
              unit_amount: Math.round(config.amount * 100),
            },
            quantity: 1,
          },
        ],
        iterations: 12, // Set a default of 12 payments
      },
    ],
    default_settings: {
      payment_method_types: ['card'],
      default_payment_method: config.payment_method_id,
    },
  })

  // Save the recurring payment configuration
  const { data: recurringPayment, error } = await supabase
    .from('recurring_payments')
    .insert([
      {
        user_id: userId,
        tenant_id: config.tenant_id,
        property_id: config.property_id,
        amount: config.amount,
        frequency: config.frequency,
        payment_day: config.payment_day,
        payment_method_id: config.payment_method_id,
        description: config.description,
        stripe_schedule_id: schedule.id,
        status: 'ACTIVE',
        next_payment_date: new Date(schedule.phases[0].start_date * 1000).toISOString(),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return recurringPayment
}

export async function updateRecurringPayment(
  id: string,
  userId: string,
  updates: Partial<RecurringPaymentConfig>
) {
  // Get the existing recurring payment
  const { data: existing, error: fetchError } = await supabase
    .from('recurring_payments')
    .select('stripe_schedule_id')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (fetchError) throw fetchError

  // Update the Stripe schedule
  if (updates.amount || updates.frequency || updates.payment_day) {
    await stripe.subscriptionSchedules.update(existing.stripe_schedule_id, {
      phases: [
        {
          items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: updates.description || 'Recurring Payment',
                  metadata: updates.metadata,
                },
                recurring: {
                  interval:
                    updates.frequency === 'yearly'
                      ? 'year'
                      : updates.frequency === 'weekly'
                        ? 'week'
                        : 'month',
                  interval_count: 1,
                },
                unit_amount: Math.round((updates.amount || 0) * 100),
              },
              quantity: 1,
            },
          ],
        },
      ],
      ...(updates.payment_method_id && {
        default_settings: {
          default_payment_method: updates.payment_method_id,
        },
      }),
    })
  }

  // Update the database record
  const { data: updated, error: updateError } = await supabase
    .from('recurring_payments')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) throw updateError
  return updated
}

export async function cancelRecurringPayment(id: string, userId: string) {
  // Get the existing recurring payment
  const { data: existing, error: fetchError } = await supabase
    .from('recurring_payments')
    .select('stripe_schedule_id')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (fetchError) throw fetchError

  // Cancel the Stripe schedule
  await stripe.subscriptionSchedules.cancel(existing.stripe_schedule_id)

  // Update the database record
  const { data: cancelled, error: updateError } = await supabase
    .from('recurring_payments')
    .update({
      status: 'CANCELLED',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single()

  if (updateError) throw updateError
  return cancelled
}

export async function getRecurringPayments(
  userId: string,
  filters?: {
    tenant_id?: string
    property_id?: string
    status?: string
  }
) {
  let query = supabase
    .from('recurring_payments')
    .select('*, tenants(*), properties(*)')
    .eq('user_id', userId)

  if (filters) {
    const { tenant_id, property_id, status } = filters
    if (tenant_id) query = query.eq('tenant_id', tenant_id)
    if (property_id) query = query.eq('property_id', property_id)
    if (status) query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

function getNextPaymentDate(paymentDay: number, frequency: string): number {
  const now = new Date()
  let nextDate = new Date(now.getFullYear(), now.getMonth(), paymentDay)

  if (frequency === 'weekly') {
    // Set to next occurrence of the specified day of week
    const currentDay = now.getDay()
    const daysUntilNext = (paymentDay - currentDay + 7) % 7
    nextDate = new Date(now.setDate(now.getDate() + daysUntilNext))
  } else if (frequency === 'yearly') {
    // Set to next occurrence of the day in the current or next year
    if (nextDate < now) {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    }
  } else {
    // Monthly - Set to next occurrence of the day in current or next month
    if (nextDate < now) {
      nextDate = new Date(now.getFullYear(), now.getMonth() + 1, paymentDay)
    }
  }

  return Math.floor(nextDate.getTime() / 1000)
}
