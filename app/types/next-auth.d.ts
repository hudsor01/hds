// types/next-auth.d.ts
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      role: 'ADMIN' | 'PROPERTY_MANAGER';
      subscriptionStatus: 'ACTIVE' | 'TRIAL';
    } & DefaultSession['user'];
  }
}
