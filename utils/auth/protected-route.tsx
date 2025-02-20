'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Box, CircularProgress } from '@mui/material'
import { useAppSelector } from '@/store/hooks'

export interface ProtectedRouteProps {
    children: React.ReactNode
    requiredRole?: string | string[]
}

export function ProtectedRoute({
    children,
    requiredRole
}: ProtectedRouteProps) {
    const router = useRouter()
    const pathname = usePathname()
    const { user, isLoading } = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!isLoading && !user) {
            const returnTo = encodeURIComponent(pathname)
            router.push(`/auth/sign-in?returnTo=${returnTo}`)
            return
        }

        // Check role requirements if specified
        if (!isLoading && user && requiredRole) {
            const userRole = user.user_metadata?.role
            const roles = Array.isArray(requiredRole)
                ? requiredRole
                : [requiredRole]

            if (!userRole || !roles.includes(userRole)) {
                router.push('/unauthorized')
            }
        }
    }, [user, isLoading, router, pathname, requiredRole])

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh'
                }}
            >
                <CircularProgress />
            </Box>
        )
    }

    if (!user) {
        return null
    }

    if (requiredRole) {
        const userRole = user.user_metadata?.role
        const roles = Array.isArray(requiredRole)
            ? requiredRole
            : [requiredRole]

        if (!userRole || !roles.includes(userRole)) {
            return null
        }
    }

    return <>{children}</>
}

export function withProtectedRoute<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    requiredRole?: string | string[]
) {
    return function WithProtectedRoute(props: P) {
        return (
            <ProtectedRoute requiredRole={requiredRole}>
                <WrappedComponent {...props} />
            </ProtectedRoute>
        )
    }
}
