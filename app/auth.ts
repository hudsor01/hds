import { compare } from 'bcryptjs';
import { Adapter } from 'next-auth/adapters';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { AuthUserMetadata } from 'types/auth-user';

import type { AdapterUser } from '@auth/core/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';

const customAdapter: Adapter = {
  ...PrismaAdapter(prisma),
  createUser: async (user: Omit<AdapterUser, 'id'>): Promise<AdapterUser> => {
    const authUser = await prisma.authUser.create({
      data: {
        email: user.email,
        email_confirmed_at: user.emailVerified,
        raw_user_meta_data: { name: user.name },
        encrypted_password: '', // Set a default empty password that will be updated later
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

    if (!newUser.email) {
      throw new Error('User email is required');
    }

    return {
      id: newUser.id,
      email: newUser.email,
      emailVerified: newUser.emailVerified,
      name: newUser.name,
      image: newUser.image,
    } as AdapterUser;
  },
};

export const { auth, signIn, signOut } = NextAuth({
  adapter: customAdapter,
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
        });

        if (!user || !user.encrypted_password) {
          throw new Error('Invalid credentials');
        }

        const isValid = await compare(credentials.password, user.encrypted_password);

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user.id,
          email: user.email,
          name: (user.raw_user_meta_data as AuthUserMetadata)?.name ?? null,
          image: null,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-email',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.stripe_customer_id = (user as any).stripe_customer_id;
        token.stripe_subscription_id = (user as any).stripe_subscription_id;
        token.subscription_status = (user as any).subscription_status;
        token.trial_ends_at = (user as any).trial_ends_at;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
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
});
