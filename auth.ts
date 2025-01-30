import { compare } from 'bcryptjs';
import NextAuth, { DefaultUser } from 'next-auth';
import { type JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './lib/prisma';
import type { AuthUserMetadata } from './types/auth-user';

type ExtendedUser = {
  stripe_customer_id?: string | null;
  stripe_subscription_id?: string | null;
  subscription_status?: string | null;
  trial_ends_at?: string | null; // Change to string here
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | undefined;
      image?: string | undefined;
      stripe_customer_id?: string | null;
      stripe_subscription_id?: string | null;
      subscription_status?: string | null;
      trial_ends_at?: string | null;
    };
  }

  interface User extends DefaultUser, ExtendedUser {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends ExtendedUser {
    id: string;
    email: string;
    name?: string | null;
    picture?: string | null;
  }
}

const adapter = PrismaAdapter(prisma);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
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
        token.stripe_customer_id = user.stripe_customer_id;
        token.stripe_subscription_id = user.stripe_subscription_id;
        token.subscription_status = user.subscription_status;
        // Convert Date to ISO string when storing in token
        token.trial_ends_at = user.trial_ends_at instanceof Date 
          ? user.trial_ends_at.toISOString() 
          : user.trial_ends_at;
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id;
        session.user.stripe_customer_id = token.stripe_customer_id;
        session.user.stripe_subscription_id = token.stripe_subscription_id;
        session.user.subscription_status = token.subscription_status;
        // Direct assignment as it's already a string
        session.user.trial_ends_at = token.trial_ends_at;
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
