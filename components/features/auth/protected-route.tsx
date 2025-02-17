'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { 
  Box, 
  CircularProgress, 
  useTheme, 
  type Theme, 
  type SxProps 
} from '@mui/material'
import { useAuth } from '@/components/providers/auth-provider'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

interface RouteStyles {
  container: SxProps<Theme>
  loader: SxProps<Theme>
}

const styles: RouteStyles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    color: 'primary.main'
  }
}

export function ProtectedRoute({ 
  children, 
  fallback,
  redirectTo = '/sign-in'
}: ProtectedRouteProps) {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      const returnPath = encodeURIComponent(pathname)
      const redirectPath = `${redirectTo}?returnTo=${returnPath}`
      router.push(redirectPath)
    }
  }, [user, loading, router, pathname, redirectTo])

  // Show loading state or fallback while checking authentication
  if (loading || !user) {
    if (fallback) {
      return fallback
    }

    return (
      <Box sx={styles.container}>
        <CircularProgress 
          size={40}
          thickness={4}
          sx={styles.loader}
        />
      </Box>
    )
  }

  return <>{children}</>
}

// Export types for potential consumers
export type { ProtectedRouteProps }

// HOC to wrap components that need protection
export function withProtection<P extends object>(
  Component: React.ComponentType<P>,
  routeProps?: Omit<ProtectedRouteProps, 'children'>
): React.FC<P> {
  const ProtectedComponent: React.FC<P> = (props) => (
    <ProtectedRoute {...routeProps}>
      <Component {...props} />
    </ProtectedRoute>
  )

  // Preserve component name for debugging
  ProtectedComponent.displayName = `Protected(${
    Component.displayName || Component.name || 'Component'
  })`

  return ProtectedComponent
}
