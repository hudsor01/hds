'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/components/providers/auth-provider'

export function useProtectedRoute() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user && window.location.pathname.startsWith('/dashboard')) {
      router.push('/login')
    }
  }, [user, loading, router])

  return { user, loading }
}
