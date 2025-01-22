import { prisma } from '@/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { routes } from './routes'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
        session.user.stripeCustomerId = user.stripeCustomerId
        session.user.stripeSubscriptionId = user.stripeSubscriptionId
        session.user.subscriptionStatus = user.subscriptionStatus
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
}

export async function signOut() {
  try {
    const response = await fetch('/api/auth/signout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to sign out')
    }

    // Redirect to home page after successful sign out
    window.location.href = routes.home
  } catch (error) {
    console.error('Error signing out:', error)
    throw error
  }
}
