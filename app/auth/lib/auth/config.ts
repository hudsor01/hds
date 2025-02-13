import { supabase, type Session, type User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton Supabase client
export const supabase = supabase(supabaseUrl, supabaseAnonKey)

// Hook to get the current session
export function useSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { session, loading }
}

// Hook to get the current user
export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    void supabase.auth.getCurrentUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
}

// Protected route configuration
export const protectedRoutes = ['/dashboard', '/settings', '/properties', '/tenants']

// Auth redirect configuration
export const authConfig = {
  redirects: {
    signIn: '/login',
    signUp: '/signup',
    forgotPassword: '/forgot-password',
    afterSignIn: '/dashboard',
    afterSignUp: '/dashboard'
  }
}
