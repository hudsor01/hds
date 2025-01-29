import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { CustomAdapter } from './auth/lib/auth/adapter';
import { routes } from './routes';

export const authOptions: NextAuthOptions = {
  adapter: CustomAdapter(),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
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
        session.user.id = token.id as string;
        (session.user as any).stripe_customer_id = token.stripe_customer_id;
        (session.user as any).stripe_subscription_id = token.stripe_subscription_id;
        (session.user as any).subscription_status = token.subscription_status;
        (session.user as any).trial_ends_at = token.trial_ends_at;
      }
      return session;
    },
  },
};

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to sign out');
    }

    window.location.href = routes.home;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
