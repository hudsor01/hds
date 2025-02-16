'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import supabase from '@/utils/supabase/client'

export function useProtectedRoute() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session)
      })
      .catch(error => console.error('Error fetching session:', error))
      .finally(() => setLoading(false))
  }, [])

  const user = session?.user

  useEffect(() => {
    if (!loading && !user && window.location.pathname.startsWith('/dashboard')) {
      router.push('/login')
    }
  }, [user, loading, router])

  return { user, loading }
}
