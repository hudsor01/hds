import { NextResponse } from 'next/server'
import { type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes, isPublicRoute, isAuthRoute } from '@/app/routes'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
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

  const { pathname } = request.nextUrl

  // Allow static files and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.startsWith('/api')) {
    return response
  }

  // Handle public routes
  if (isPublicRoute(pathname)) {
    return response
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute(pathname)) {
    if (session) {
      // If user is already logged in, redirect to dashboard
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url))
    }
    return response
  }

  // Protected routes
  if (!session) {
    const returnTo = encodeURIComponent(pathname)
    return NextResponse.redirect(new URL(`/sign-in?returnTo=${returnTo}`, request.url))
  }

  // User is authenticated, allow access to protected routes
  return response
}

// Configure which routes to run middleware on
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
