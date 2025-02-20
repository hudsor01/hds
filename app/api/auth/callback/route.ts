import { createClient } from '@/lib/supabase/server'
import type {
    AuthError,
    type AuthResponse
} from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function isAuthError(error: unknown): error is AuthError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        'status' in error
    )
}

export async function GET(request: Request): Promise<NextResponse> {
    try {
        const requestUrl = new URL(request.url)
        const code: string | null =
            requestUrl.searchParams.get('code')
        const next: string =
            requestUrl.searchParams.get('next') ?? '/dashboard'

        if (!code) {
            throw new Error('No code provided')
        }

        const supabase = createClient()
        const { error }: AuthResponse =
            await supabase.auth.exchangeCodeForSession(code)

        if (error) {
            throw error
        }

        return NextResponse.redirect(new URL(next, requestUrl))
    } catch (error) {
        console.error('Auth callback error:', error)

        const errorMessage: string = isAuthError(error)
            ? error.message
            : error instanceof Error
              ? error.message
              : 'Could not authenticate user'

        return NextResponse.redirect(
            new URL(
                `/auth/sign-in?error=${encodeURIComponent(errorMessage)}`,
                request.url
            )
        )
    }
}
