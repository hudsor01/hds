import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
    initializeAuth,
    refreshSession
} from '@/store/slices/authSlice'
import { createClient } from '@/utils/supabase/client'

export function useAuthPersistence() {
    const dispatch = useAppDispatch()
    const { session } = useAppSelector(state => state.auth)

    useEffect(() => {
        // Initialize auth state
        dispatch(initializeAuth())

        // Set up auth state change listener
        const supabase = createClient()
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN') {
                    // Handle sign in
                    await dispatch(initializeAuth())
                } else if (event === 'SIGNED_OUT') {
                    // Handle sign out
                    await dispatch(initializeAuth())
                } else if (event === 'TOKEN_REFRESHED') {
                    // Handle token refresh
                    await dispatch(refreshSession())
                }
            }
        )

        // Set up session refresh interval
        let refreshInterval: NodeJS.Timeout
        if (session) {
            const expiresAt = new Date(session.expires_at!).getTime()
            const now = Date.now()
            const timeUntilExpiry = expiresAt - now

            // Refresh 5 minutes before expiry
            const refreshTime = timeUntilExpiry - 5 * 60 * 1000

            if (refreshTime > 0) {
                refreshInterval = setInterval(() => {
                    dispatch(refreshSession())
                }, refreshTime)
            }
        }

        return () => {
            subscription.unsubscribe()
            if (refreshInterval) {
                clearInterval(refreshInterval)
            }
        }
    }, [dispatch])

    return null
}
