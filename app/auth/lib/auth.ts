import type { NextAuthOptions } from 'next-auth'
import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
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
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.stripe_customer_id = user.stripe_customer_id
        token.subscription_status = user.subscription_status
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        (session.user as any).stripe_customer_id = token.stripe_customer_id;
        (session.user as any).subscription_status = token.subscription_status;
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  }
}

export const auth = () => getServerSession(authOptions)

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
export default NextAuth(authOptions)
