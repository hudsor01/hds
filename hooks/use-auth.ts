'use client'

import { createBrowserClient } from '@supabase/ssr'
import { type SupabaseClient } from '@supabase/supabase-js'
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { type Profile, type AuthUser } from '@/types/auth'
import type { Session, AuthChangeEvent } from '@supabase/supabase-js'

declare module '@supabase/supabase-js' {
  interface User {
    role?: string
  }
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const supabaseClient: SupabaseClient = useMemo(
    () => createBrowserClient(process.env['NEXT_PUBLIC_SUPABASE_URL'], process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']),
    []
  )

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const {
          data: { user }
        } = await supabaseClient.auth.getUser()
        if (user) {
          const { data: profile } = (await supabaseClient.from('profiles').select('role').eq('id', user.id).single()) as {
            data: Profile | null
          }

          setUser({ ...user, role: profile?.role ?? '' })
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    void getInitialSession()

    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      if (session?.user) {
        const { data: profile } = (await supabaseClient.from('profiles').select('role').eq('id', session.user.id).single()) as {
          data: Profile | null
        }

        setUser({ ...session.user, role: profile?.role ?? '' })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      } else {
        console.warn('Subscription does not support unsubscribe.')
      }
    }
  }, [supabaseClient, router])

  const signOut = async () => {
    try {
      await supabaseClient.auth.signOut()
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return { user, loading, signOut }
}
