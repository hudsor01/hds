import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth, { DefaultSession, User } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

interface ExtendedUser extends User {
  stripe_customer_id?: string | null
  subscription_status?: string | null
}

interface ExtendedSession extends DefaultSession {
  user: {
    id: string
    stripe_customer_id?: string | null
    subscription_status?: string | null
  } & DefaultSession['user']
}

interface ExtendedToken {
  id: string
  stripe_customer_id?: string | null
  subscription_status?: string | null
}

function isExtendedUser(user: any): user is ExtendedUser {
  return user && typeof user === 'object' && 'id' in user
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
    session({ session, token }): ExtendedSession {
      if (session.user) {
        const extendedToken = token as ExtendedToken
        return {
          ...session,
          user: {
            ...session.user,
            id: extendedToken.id,
            stripe_customer_id: extendedToken.stripe_customer_id,
            subscription_status: extendedToken.subscription_status
          }
        }
      }
      return session as ExtendedSession
    },
    jwt({ token, user }) {
      if (user && isExtendedUser(user)) {
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
