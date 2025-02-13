import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const { token } = await request.json()

  if (!token) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
  }

  const supabase = supabase()

  const { error } = await supabase.auth.signIn({ token })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 })
  }

  // Set authentication cookie
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // 1 week
  })

  return NextResponse.json({ success: true })
}
