import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { DefaultSession } from 'next-auth'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      stripe_customer_id?: string | null
      subscription_status?: string | null
      emailVerified?: Date | null
    }
  }
}

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma, {
    modelMapping: {
      User: 'authUser',
      Account: 'authAccount',
      Session: 'authSession',
      VerificationToken: 'authVerificationToken',
    }
  }),
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
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.email = token.email as string
      }
      return session
    }
  }
})
