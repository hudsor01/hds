// next-auth.d.ts
import 'next-auth';

type userId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      stripe_customer_id: string | null | undefined;
      stripe_subscription_id: string | null | undefined;
      subscription_status: string | null | undefined;
      trial_ends_at: Date | null | undefined;
      id: string;
      email: string;
      name?: string;
      image?: string;
    };
  }
}
