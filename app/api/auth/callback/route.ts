import { supabase } from '@/lib/supabase'
import { AuthError } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'message' in error && 'status' in error
}

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'

    if (!code) {
      throw new Error('No code provided')
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      throw error
    }

    return NextResponse.redirect(new URL(next, requestUrl))
  } catch (error) {
    console.error('Auth callback error:', error)

    const errorMessage = isAuthError(error)
      ? error.message
      : error instanceof Error
        ? error.message
        : 'Could not authenticate user'

    return NextResponse.redirect(new URL(`/auth/sign-in?error=${encodeURIComponent(errorMessage)}`, request.url))
  }
}
