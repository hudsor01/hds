import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import NextAuth, { type DefaultSession, type Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '../prisma'
import { authConfig } from './config'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Partial<Record<"email" | "password", unknown>>, _request: Request): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          console.log('Invalid credentials format')
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user?.password) {
          console.log('User not found')
          return null
        }

        const passwordsMatch = await bcrypt.compare(credentials.password as string, user.password)

        if (!passwordsMatch) {
          console.log('Invalid password')
          return null
        }

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email || null
        token.name = user.name || null
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null
      }
      return session
    }
  }
})
