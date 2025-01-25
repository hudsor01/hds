import type { DefaultSession } from 'next-auth'

export type SubscriptionStatus = 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused' | null

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string | null
      image: string | null
      stripe_customer_id: string | null
      stripe_subscription_id: string | null
      subscription_status: SubscriptionStatus | null
      trial_ends_at: number | null
    }
  }
}
