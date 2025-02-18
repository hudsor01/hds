import type { IronSessionOptions } from 'iron-session'
import type { User } from '@supabase/supabase-js'

export interface SessionData {
  user?: Pick<User, 'id' | 'email' | 'user_metadata'>
}

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_PASSWORD!, // At least 32 characters
  cookieName: 'hds_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    path: '/'
    // domain: process.env.NEXT_PUBLIC_DOMAIN, // Add in production
  },
  ttl: 7200 // 2 hours in seconds
}

// Helper to get typed session data
declare module 'iron-session' {
  interface IronSessionData extends SessionData {}
}
