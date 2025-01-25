import { type DefaultSession } from 'next-auth'

export type SubscriptionStatus = 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused' | null

declare module 'next-auth' {
  interface Session {
    user: {
      stripe_customer_id?: string | null
      subscription_status?: SubscriptionStatus | null
    } & DefaultSession['user']
  }
}
