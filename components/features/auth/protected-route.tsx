'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useGlobal } from '@/contexts/GlobalContext'
import { LoadingOverlay } from '@/components/shared/LoadingOverlay'

export function withProtectedRoute<P extends object>(
    WrappedComponent: React.ComponentType<P>
) {
    return function ProtectedRoute(props: P) {
        const router = useRouter()
        const pathname = usePathname()
        const { user, isLoading } = useGlobal()

        useEffect(() => {
            if (!isLoading && !user) {
                const returnTo = encodeURIComponent(pathname)
                router.push(`/auth/sign-in?returnTo=${returnTo}`)
            }
        }, [user, isLoading, router, pathname])

        if (isLoading) {
            return (
                <LoadingOverlay message="Checking authentication..." />
            )
        }

        if (!user) {
            return null
        }

        return <WrappedComponent {...props} />
    }
}

export function ProtectedRoute({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const pathname = usePathname()
    const { user, isLoading } = useGlobal()

    useEffect(() => {
        if (!isLoading && !user) {
            const returnTo = encodeURIComponent(pathname)
            router.push(`/auth/sign-in?returnTo=${returnTo}`)
        }
    }, [user, isLoading, router, pathname])

    if (isLoading) {
        return <LoadingOverlay message="Checking authentication..." />
    }

    if (!user) {
        return null
    }

    return <>{children}</>
}
