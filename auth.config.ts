import { Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

// Define custom interface for user attributes
interface CustomUser {
  id: string;
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  subscription_status?: string | null;
  trial_ends_at?: Date | null;
  role?: string | null;
}

// Extend Session interface
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

  interface User extends CustomUser {}
}

// Extend JWT interface
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

const THIRTY_DAYS = 30 * 24 * 60 * 60; // 30 days in seconds

const authConfig = {
  providers: [],
  session: {
    strategy: 'jwt',
    maxAge: THIRTY_DAYS,
  },
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-email',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        // Update token with user data during sign in
        token = {
          ...token,
          id: user.id,
          stripe_customer_id: (user as CustomUser).stripe_customer_id,
          stripe_subscription_id: (user as CustomUser).stripe_subscription_id,
          subscription_status: (user as CustomUser).subscription_status,
          trial_ends_at: (user as CustomUser).trial_ends_at,
          supabase_provider: account?.provider,
          role: (user as CustomUser).role,
        };
      }

      // Check token expiration
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (token?.exp && token.exp < nowInSeconds) {
        try {
          const {
            data: { session },
            error,
          } = await supabase.auth.refreshSession();

          if (error || !session) {
            console.error('Failed to refresh session:', error);
            return null; // Force sign out
          }

          // Update token with new expiry
          token.exp = Math.floor(Date.now() / 1000 + session.expires_in);
        } catch (error) {
          console.error('Error refreshing session:', error);
          return null; // Force sign out
        }
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session?.user && token) {
        session.user = {
          ...session.user,
          id: token.id,
          stripe_customer_id: token.stripe_customer_id,
          stripe_subscription_id: token.stripe_subscription_id,
          subscription_status: token.subscription_status,
          trial_ends_at: token.trial_ends_at,
          supabase_provider: token.supabase_provider,
          role: token.role,
        };
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
