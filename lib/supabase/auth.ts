import type { AuthError } from '@supabase/supabase-js'
import { createClient } from './client'
import type { Database } from '@/types/db.types'

const supabase = createClient()

export type AuthResponse = {
    error: AuthError | null
    success: boolean
    message: string
}

export async function signIn(
    email: string,
    password: string
): Promise<AuthResponse> {
    try {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        return {
            error: null,
            success: true,
            message: 'Successfully signed in'
        }
    } catch (error) {
        return {
            error: error as AuthError,
            success: false,
            message:
                (error as AuthError).message ??
                'An error occurred during sign in'
        }
    }
}

export async function signUp(
    email: string,
    password: string
): Promise<AuthResponse> {
    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (error) throw error

        return {
            error: null,
            success: true,
            message: 'Please check your email to confirm your account'
        }
    } catch (error) {
        return {
            error: error as AuthError,
            success: false,
            message:
                (error as AuthError).message ??
                'An error occurred during sign up'
        }
    }
}

export async function signOut(): Promise<AuthResponse> {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error

        return {
            error: null,
            success: true,
            message: 'Successfully signed out'
        }
    } catch (error) {
        return {
            error: error as AuthError,
            success: false,
            message:
                (error as AuthError).message ??
                'An error occurred during sign out'
        }
    }
}

export async function resetPassword(
    email: string
): Promise<AuthResponse> {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/update-password`
            }
        )

        if (error) throw error

        return {
            error: null,
            success: true,
            message: 'Password reset instructions sent to your email'
        }
    } catch (error) {
        return {
            error: error as AuthError,
            success: false,
            message:
                (error as AuthError).message ??
                'An error occurred during password reset'
        }
    }
}

export async function updatePassword(
    password: string
): Promise<AuthResponse> {
    try {
        const { error } = await supabase.auth.updateUser({
            password
        })

        if (error) throw error

        return {
            error: null,
            success: true,
            message: 'Password updated successfully'
        }
    } catch (error) {
        return {
            error: error as AuthError,
            success: false,
            message:
                (error as AuthError).message ??
                'An error occurred while updating password'
        }
    }
}

// Helper to check if user has specific role
export async function hasRole(role: string): Promise<boolean> {
    try {
        const {
            data: { user },
            error
        } = await supabase.auth.getUser()
        if (error) throw error

        return user?.user_metadata.role === role
    } catch (error) {
        console.error('Error checking role:', error)
        return false
    }
}

// Helper to get user profile
export async function getUserProfile() {
    try {
        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser()
        if (userError) throw userError

        if (!user?.id) return null

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (profileError) throw profileError

        return profile
    } catch (error) {
        console.error('Error getting user profile:', error)
        return null
    }
}

// Export types and utilities
export type { Database }
export * from './client'
export * from './server'
