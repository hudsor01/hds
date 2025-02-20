import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { useGlobal } from '@/contexts/GlobalContext'
import { handleDatabaseError } from '@/utils/errors/database'

export function useAuth() {
    const router = useRouter()
    const { setGlobalLoading } = useGlobal()
    const supabase = createClient()

    const signIn = useCallback(
        async (email: string, password: string) => {
            try {
                setGlobalLoading(true)
                const { error } =
                    await supabase.auth.signInWithPassword({
                        email,
                        password
                    })

                if (error) throw error

                router.refresh()
                router.push('/dashboard')
            } catch (error) {
                await handleDatabaseError(error)
            } finally {
                setGlobalLoading(false)
            }
        },
        [router, setGlobalLoading]
    )

    const signUp = useCallback(
        async (
            email: string,
            password: string,
            metadata?: { [key: string]: any }
        ) => {
            try {
                setGlobalLoading(true)
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                        data: metadata
                    }
                })

                if (error) throw error

                router.push('/auth/verify-email')
            } catch (error) {
                await handleDatabaseError(error)
            } finally {
                setGlobalLoading(false)
            }
        },
        [router, setGlobalLoading]
    )

    const signOut = useCallback(async () => {
        try {
            setGlobalLoading(true)
            const { error } = await supabase.auth.signOut()
            if (error) throw error

            router.refresh()
            router.push('/')
        } catch (error) {
            await handleDatabaseError(error)
        } finally {
            setGlobalLoading(false)
        }
    }, [router, setGlobalLoading])

    const signInWithGoogle = useCallback(async () => {
        try {
            setGlobalLoading(true)
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            })

            if (error) throw error
        } catch (error) {
            await handleDatabaseError(error)
        } finally {
            setGlobalLoading(false)
        }
    }, [setGlobalLoading])

    const resetPassword = useCallback(
        async (email: string) => {
            try {
                setGlobalLoading(true)
                const { error } =
                    await supabase.auth.resetPasswordForEmail(email, {
                        redirectTo: `${window.location.origin}/auth/reset-password`
                    })

                if (error) throw error
            } catch (error) {
                await handleDatabaseError(error)
            } finally {
                setGlobalLoading(false)
            }
        },
        [setGlobalLoading]
    )

    const updatePassword = useCallback(
        async (newPassword: string) => {
            try {
                setGlobalLoading(true)
                const { error } = await supabase.auth.updateUser({
                    password: newPassword
                })

                if (error) throw error

                router.push('/dashboard')
            } catch (error) {
                await handleDatabaseError(error)
            } finally {
                setGlobalLoading(false)
            }
        },
        [router, setGlobalLoading]
    )

    return {
        signIn,
        signUp,
        signOut,
        signInWithGoogle,
        resetPassword,
        updatePassword
    }
}
