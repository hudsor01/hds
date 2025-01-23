import { NextAuthOptions, Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';

import { routes } from './routes';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-email',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user = {
          ...session.user,
          id: user.id,
          stripe_customer_id: user.stripe_customer_id || null,
          stripe_subscription_id: user.stripe_subscription_id || null,
          subscription_status: user.subscription_status || null,
        } as Session['user'];
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

    // Redirect to home page after successful sign out
    window.location.href = routes.home;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}
