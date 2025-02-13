import { supabase } from '@/utils/supabase/server'
import { type EmailOtpType } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/'
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const error = searchParams.get('error')

    // If there's an error parameter, redirect to error page with the message
    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?message=${encodeURIComponent(error)}`
      )
    }

    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError)
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?message=${encodeURIComponent(exchangeError.message)}`
        )
      }
    }

    if (token_hash && type) {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        type,
        token_hash
      })
      if (verifyError) {
        console.error('Error verifying OTP:', verifyError)
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?message=${encodeURIComponent(verifyError.message)}`
        )
      }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}${next}`)
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/error?message=An unexpected error occurred`
    )
  }
}
