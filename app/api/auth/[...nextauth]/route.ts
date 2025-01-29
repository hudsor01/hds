import { compare } from 'bcryptjs';
import NextAuth, { type NextAuthOptions, RequestInternal, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { AdapterUser } from '@auth/core/adapters';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { prisma } from '@/lib/prisma';

// Custom adapter to handle schema prefixing
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

    return {
      id: newUser.id,
      email: newUser.email as string,
      emailVerified: newUser.emailVerified,
      name: newUser.name,
      image: newUser.image,
    } as AdapterUser;
  },
};

export const authOptions: NextAuthOptions = {
  adapter: customAdapter,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
        req: Pick<RequestInternal, 'query' | 'headers' | 'body' | 'method'>,
      ) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const authUser = await prisma.authUser.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!authUser || !authUser.encrypted_password) {
          throw new Error('Invalid credentials');
        }

        const isValid = await compare(credentials.password, authUser.encrypted_password);

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: { id: authUser.id },
        });

        if (!user || !user.email) {
          throw new Error('User not found');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? null,
          image: user.image ?? null,
          emailVerified: user.emailVerified ?? null,
        } as User;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // Ensure all required fields are present and properly typed
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = (token.picture as string) || null;
        // Add custom fields
        (session.user as any).stripe_customer_id = token.stripe_customer_id as string | null;
        (session.user as any).subscription_status = token.subscription_status as string | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
  },
};

const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
