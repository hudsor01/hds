import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import type { DefaultSession, User } from 'next-auth'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

type UserExtensions = {
  stripeCustomerId?: string | null
  subscriptionStatus?: string | null
  emailVerified?: Date | null
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & UserExtensions & {
      id: string
    }
  }

  interface User extends UserExtensions {}
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
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        return false
      }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image
        token.stripeCustomerId = (user as User & UserExtensions).stripeCustomerId
        token.subscriptionStatus = (user as User & UserExtensions).subscriptionStatus
        token.emailVerified = (user as User & UserExtensions).emailVerified
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | undefined
        session.user.image = token.picture as string | undefined
        session.user.stripeCustomerId = token.stripeCustomerId as string | null
        session.user.subscriptionStatus = token.subscriptionStatus as string | null
        session.user.emailVerified = token.emailVerified as Date | null
      }
      return session
    }
  }
})
