import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next') ?? '/dashboard'

    if (!code) {
      throw new Error('No code provided')
    }

    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      throw error
    }

    return NextResponse.redirect(new URL(next, requestUrl))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(
      new URL('/auth/sign-in?error=Could not authenticate user', request.url)
    )
  }
}