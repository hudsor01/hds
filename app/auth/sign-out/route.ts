import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { AuthError } from '@supabase/supabase-js'

function isAuthError(error: unknown): error is AuthError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'status' in error
    )
}

export async function POST(): Promise<NextResponse> {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        return NextResponse.json({
            message: 'Signed out successfully'
        })
    } catch (error) {
        console.error('Sign out error:', error)

        if (isAuthError(error)) {
            return NextResponse.json(
                {
                    error: 'Authentication Error',
                    message: error.message
                },
                { status: 401 }
            )
        }

        return NextResponse.json(
            {
                error: 'Internal server error',
                message:
                    error instanceof Error
                        ? error.message
                        : 'Unknown error'
            },
            { status: 500 }
        )
    }
}
