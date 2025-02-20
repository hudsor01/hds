'use client'

import { useEffect, useState } from 'react'
import { StoreProvider } from './StoreProvider'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '@/lib/theme'
import { LoadingOverlay } from '@/components/shared/LoadingOverlay'
import { Notifications } from '@/components/shared/Notifications'
import { useAuthPersistence } from '@/hooks/useAuthPersistence'

function AuthPersistence() {
    useAuthPersistence()
    return null
}

export function AppProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return <LoadingOverlay />
    }

    return (
        <StoreProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthPersistence />
                {children}
                <Notifications />
            </ThemeProvider>
        </StoreProvider>
    )
}
