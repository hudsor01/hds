// types/next-auth.d.ts
import 'next-auth';
import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    subscription_status?: string | null;
    trial_ends_at?: Date | null;
  }

  interface Session {
    user: User;
  }
}
