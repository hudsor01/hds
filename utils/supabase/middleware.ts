import { supabase } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/db.types'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = supabase<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  )

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
