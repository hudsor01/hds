'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/components/providers/auth-provider'

export function useProtectedRoute() {
  const { user, isLoading } = usesupabase.auth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user && window.location.pathname.startsWith('/dashboard')) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  return { user, isLoading }
}
