'use client'

import { type Session, type User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/auth'
import { type UseSessionReturn } from '@/types/auth'

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data }) => {
        setSession(data.session)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error getting session:', error)
        setLoading(false)
      })

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { session, loading }
}

interface UseUserReturn {
  user: User | null
  loading: boolean
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    supabase.auth
      .getUser()
      .then(({ data }) => {
        setUser(data.user)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error getting user:', error)
        setLoading(false)
      })

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event: any, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      interface Subscription {
        unsubscribe?: () => void
      }

      if (subscription.unsubscribe) {
        subscription.unsubscribe()
      } else {
        console.warn('Subscription cancellation method is not available.', subscription)
      }
    }
  }, [])

  return { user, loading }
}

export const protectedRoutes = ['/dashboard', '/settings', '/properties', '/tenants'] as const

export const authConfig = {
  redirects: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    afterSignIn: '/dashboard',
    afterSignUp: '/dashboard'
  }
} as const
