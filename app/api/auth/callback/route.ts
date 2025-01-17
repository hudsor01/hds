import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/login?error=auth', request.url))
      }

      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=auth', request.url))
  }
}
