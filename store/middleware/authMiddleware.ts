import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { createClient } from '@/utils/supabase/client'
import {
    setSession,
    setUser,
    signIn,
    signInWithGoogle,
    signOut
} from '../slices/authSlice'
import type { RootState } from '../types'

export const authMiddleware = createListenerMiddleware()

// Handle session persistence and refresh
authMiddleware.startListening({
    matcher: isAnyOf(signIn.fulfilled, signInWithGoogle.fulfilled),
    effect: async (action, listenerApi) => {
        const supabase = createClient()

        // Set up session refresh
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session) {
                    listenerApi.dispatch(setSession(session))
                    listenerApi.dispatch(setUser(session.user))
                } else {
                    // Clear session on auth state change to null
                    listenerApi.dispatch(setSession(null))
                    listenerApi.dispatch(setUser(null))
                }
            }
        )

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe()
        }
    }
})

// Handle token refresh
authMiddleware.startListening({
    predicate: (action, currentState, previousState) => {
        const prevSession = (previousState as RootState).auth.session
        const currentSession = (currentState as RootState).auth
            .session

        // Check if session exists and is about to expire (within 60 seconds)
        if (currentSession && !prevSession) {
            const expiresAt = new Date(
                currentSession.expires_at!
            ).getTime()
            const now = Date.now()
            return (expiresAt - now) / 1000 <= 60
        }
        return false
    },
    effect: async (action, listenerApi) => {
        const supabase = createClient()
        const {
            data: { session },
            error
        } = await supabase.auth.refreshSession()

        if (session) {
            listenerApi.dispatch(setSession(session))
            listenerApi.dispatch(setUser(session.user))
        } else if (error) {
            // If refresh fails, sign out
            listenerApi.dispatch(signOut())
        }
    }
})
