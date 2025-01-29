import type { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import type { Config as NextAuthConfig } from '@auth/core/types';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      stripe_customer_id?: string | null;
      stripe_subscription_id?: string | null;
      subscription_status?: string | null;
      trial_ends_at?: Date | null;
      supabase_provider?: string | null;
      role?: string | null;
    };
  }

  interface User {
    id: string;
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    subscription_status?: string | null;
    trial_ends_at?: Date | null;
    role?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    subscription_status?: string | null;
    trial_ends_at?: Date | null;
    supabase_provider?: string | null;
    role?: string | null;
    exp?: number;
  }
}

const authConfig = {
  providers: [],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-email',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.stripe_customer_id = user.stripe_customer_id;
        token.stripe_subscription_id = user.stripe_subscription_id;
        token.subscription_status = user.subscription_status;
        token.trial_ends_at = user.trial_ends_at;
        token.supabase_provider = account?.provider;
        token.role = user.role;
      }

      // Check if token is expired
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (token?.exp && token.exp < nowInSeconds) {
        // Token has expired, try to refresh
        const {
          data: { session },
          error,
        } = await supabase.auth.refreshSession();
        if (error || !session) {
          return null; // Force sign out
        }
        // Update token with new expiry
        token.exp = Math.floor(Date.now() / 1000 + session.expires_in);
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user && token) {
        session.user.id = token.id;
        session.user.stripe_customer_id = token.stripe_customer_id;
        session.user.stripe_subscription_id = token.stripe_subscription_id;
        session.user.subscription_status = token.subscription_status;
        session.user.trial_ends_at = token.trial_ends_at;
        session.user.supabase_provider = token.supabase_provider;
        session.user.role = token.role;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
