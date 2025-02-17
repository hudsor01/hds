import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? ''
  const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        response.cookies.set({
          name,
          value,
          ...options
        })
      },
      remove(name: string, options: CookieOptions) {
        response.cookies.set({
          name,
          value: '',
          ...options
        })
      }
    }
  })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/properties', '/tenants', '/maintenance', '/settings', '/account']

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  // If the path is protected but user is not authenticated, redirect to sign-in
  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/sign-in', request.url)
    redirectUrl.searchParams.set('returnTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is authenticated and tries to access auth pages, redirect to dashboard
  const authPaths = ['/sign-in', '/sign-up', '/forgot-password']
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isAuthPath && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - api (API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)'
  ]
}
