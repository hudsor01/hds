import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/login', '/auth/callback']

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  const { pathname } = request.nextUrl

  // Refresh session if expired
  const { data: { session }, error } = await supabase.auth.getSession()

  // Allow access to public routes
  if (publicRoutes.includes(pathname) || pathname.startsWith('/auth/')) {
    return res
  }

  // Check auth status for protected routes
  if (!session) {
    const redirectUrl = new URL('/login', request.url)
    // Add ?next=/protected-route to redirect back after login
    redirectUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
