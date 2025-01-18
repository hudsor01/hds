import type { Profile } from "next-auth"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

interface GoogleProfile extends Profile {
  email_verified?: boolean
}

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return !!(profile as GoogleProfile).email_verified
      }
      return true
    }
  }
})

export const { auth } = handler
export const { GET, POST } = handler
