'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/components/providers/auth-provider'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      // Store the intended destination for post-login redirect
      router.push(`/sign-in?returnTo=${encodeURIComponent(pathname)}`)
    }
  }, [user, loading, router, pathname])

  // Show nothing while loading or if not authenticated
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
      </div>
    )
  }

  return <>{children}</>
}
