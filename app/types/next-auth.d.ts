// types/next-auth.d.ts
import 'next-auth'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      stripe_customer_id?: string | null
      subscription_status?: string | null
    }
  }

  interface User {
    id: string
    email: string
    stripe_customer_id?: string | null
    subscription_status?: string | null
    emailVerified?: Date | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    stripe_customer_id?: string | null
    subscription_status?: string | null
  }
}
