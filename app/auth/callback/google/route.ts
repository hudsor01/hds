import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    console.error('No code received in callback')
    return NextResponse.redirect(`${requestUrl.origin}/auth/error`)
  }

  try {
    console.log('Received auth callback with code')
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('Failed to exchange code for session:', error.message, error)
      throw error
    }

    console.log('Successfully exchanged code for session')
    return NextResponse.redirect(requestUrl.origin)

  } catch (error) {
    console.error('Auth callback error:', error instanceof Error ? error.message : error)
    return NextResponse.redirect(`${requestUrl.origin}/auth/error`)
  }
}
