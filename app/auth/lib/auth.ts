import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      stripe_customer_id?: string | null
      subscription_status?: string | null
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    stripe_customer_id?: string | null
    subscription_status?: string | null
    accessToken?: string
  }
}

const prisma = new PrismaClient()

export const { handlers, auth, signIn, signOut } = NextAuth({
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
    })
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.stripe_customer_id = token.stripe_customer_id
        session.user.subscription_status = token.subscription_status
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.stripe_customer_id = user.stripe_customer_id
        token.subscription_status = user.subscription_status
      }
      return token
    }
  },
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  }
})
