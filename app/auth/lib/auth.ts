import type { AdapterUser } from '@auth/core/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { NextAuthOptions, Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      stripe_customer_id?: string | null
      subscription_status?: string | null
      emailVerified?: Date | null
    }
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    stripe_customer_id?: string | null
    subscription_status?: string | null
    emailVerified?: Date | null
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return !!(profile?.email && profile?.email_verified)
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: { session: Session; token: JWT; user: any }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        ;(session.user as any).stripe_customer_id = user?.stripe_customer_id
        ;(session.user as any).subscription_status = user?.subscription_status
        ;(session.user as any).emailVerified = user?.emailVerified
      }
      return session
    },
  },
  events: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            emailVerified: new Date(),
          },
        });
      }
    },
  },
  debug: process.env.NODE_ENV === 'development',
}
