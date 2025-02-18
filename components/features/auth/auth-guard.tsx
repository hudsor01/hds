'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Box, CircularProgress, useTheme } from '@mui/material'
import { useSupabase } from '@/lib/supabase/provider'

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const { session, isLoading } = useSupabase()

  useEffect(() => {
    if (!isLoading && !session) {
      // Store the intended destination for post-login redirect
      router.push(`/sign-in?returnTo=${encodeURIComponent(pathname)}`)
    }
  }, [session, isLoading, router, pathname])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <CircularProgress size={40} />
      </Box>
    )
  }

  if (!session) {
    return null
  }

  return <>{children}</>
}

// HOC to wrap protected components
export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAuthComponent(props: P) {
    return (
      <AuthGuard>
        <WrappedComponent {...props} />
      </AuthGuard>
    )
  }
}

// Usage example:
/*
// Method 1: Direct usage
function ProtectedPage() {
  return (
    <AuthGuard>
      <YourComponent />
    </AuthGuard>
  )
}

// Method 2: HOC usage
const ProtectedComponent = withAuth(YourComponent)
*/
