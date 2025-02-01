import { Database } from '@/types/database.types'
import { auth } from '@clerk/nextjs/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const authRequest = await auth()
  if (!authRequest.userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    // Get Supabase token from Clerk
    const token = await authRequest.getToken({ template: 'supabase' })

    if (token) {
      // Set the Supabase token
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: '',
      })
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}

export async function POST(request: Request) {
  const authRequest = await auth()
  if (!authRequest.userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const supabase = createRouteHandlerClient<Database>({ cookies })
  const token = await authRequest.getToken({ template: 'supabase' })

  if (token) {
    // Clear the Supabase session
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', request.url), {
    status: 302,
  })
}
