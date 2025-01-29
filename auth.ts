import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { Adapter, AdapterUser } from '@auth/core/adapters';

import { prisma } from '@/lib/prisma';

import type { AuthUserMetadata } from './types/auth-user';

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
  interface User extends AdapterUser {
    stripe_customer_id?: string | null;
    stripe_subscription_id?: string | null;
    subscription_status?: string | null;
    trial_ends_at?: Date | null;
  }
}

const customAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: async (user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
    const authUser = await prisma.authUser.create({
      data: {
        email: user.email,
        email_confirmed_at: user.emailVerified,
        raw_user_meta_data: { name: user.name },
        encrypted_password: '',
      },
    });

    const newUser = await prisma.user.create({
      data: {
        id: authUser.id,
        email: user.email,
        name: user.name ?? null,
        image: user.image ?? null,
        emailVerified: user.emailVerified ?? null,
      },
    });

    if (!newUser.email) throw new Error('User email is required');

    return {
      id: newUser.id,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      name: newUser.name,
      image: newUser.image,
    } as AdapterUser;
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: customAdapter,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.authUser.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            encrypted_password: true,
            raw_user_meta_data: true,
            stripe_customer_id: true,
            stripe_subscription_id: true,
            subscription_status: true,
            trial_ends_at: true,
          },
        });

        if (
          !user?.encrypted_password ||
          !(await compare(credentials.password, user.encrypted_password))
        ) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: (user.raw_user_meta_data as AuthUserMetadata)?.name ?? null,
          image: null,
          stripe_customer_id: user.stripe_customer_id,
          stripe_subscription_id: user.stripe_subscription_id,
          subscription_status: user.subscription_status,
          trial_ends_at: user.trial_ends_at,
        };
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.stripe_customer_id = (user as any).stripe_customer_id;
        token.stripe_subscription_id = (user as any).stripe_subscription_id;
        token.subscription_status = (user as any).subscription_status;
        token.trial_ends_at = (user as any).trial_ends_at;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.stripe_customer_id = token.stripe_customer_id as string;
        session.user.stripe_subscription_id = token.stripe_subscription_id as string;
        session.user.subscription_status = token.subscription_status as string;
        session.user.trial_ends_at = token.trial_ends_at as Date;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-email',
  },
});
