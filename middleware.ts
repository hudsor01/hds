import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  // Refresh session if expired
  await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtectedPath) {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

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
