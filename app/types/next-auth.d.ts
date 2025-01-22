// types/next-auth.d.ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: {
      id: string
      stripeCustomerId?: string | null
      stripeSubscriptionId?: string | null
      subscriptionStatus?: string | null
    } & DefaultSession['user']
  }

  interface User {
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    subscriptionStatus?: string | null
  }
}
