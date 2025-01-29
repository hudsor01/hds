import type { NextAuthConfig } from 'next-auth';

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
    };
  }

  interface JWT {
    id: string;
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    subscription_status?: string | null;
    trial_ends_at?: Date | null;
  }
}

export default {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-email',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.stripe_customer_id = user.stripe_customer_id;
        token.stripe_subscription_id = user.stripe_subscription_id;
        token.subscription_status = user.subscription_status;
        token.trial_ends_at = user.trial_ends_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id;
        session.user.stripe_customer_id = token.stripe_customer_id;
        session.user.stripe_subscription_id = token.stripe_subscription_id;
        session.user.subscription_status = token.subscription_status;
        session.user.trial_ends_at = token.trial_ends_at;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
