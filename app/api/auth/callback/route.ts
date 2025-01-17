import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')

    if (error) {
      console.error('Auth error:', error, error_description)
      return NextResponse.redirect(new URL('/login?error=auth', request.url))
    }

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

      // Add retries for session exchange
      let retries = 3
      let exchangeError = null

      while (retries > 0) {
        try {
          const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
          if (!sessionError) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
          }
          exchangeError = sessionError
        } catch (e) {
          exchangeError = e
          console.error('Session exchange attempt failed:', e)
        }

        retries--
        if (retries > 0) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      if (exchangeError) {
        console.error('Final session exchange error:', exchangeError)
        return NextResponse.redirect(new URL('/login?error=auth', request.url))
      }
    }

    // If we get here without a code or error, something went wrong
    console.error('No code or error in callback')
    return NextResponse.redirect(new URL('/login?error=auth', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=auth', request.url))
  }
}
