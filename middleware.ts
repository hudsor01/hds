import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  return res
}

export const config = {
  matcher: [
    // Protected routes
    '/dashboard/:path*',

    // Public routes that need auth refresh
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/pricing',
    '/contact',
    '/about',
    '/features'
  ]
}
