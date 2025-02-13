import supabase from '@/lib/supabase'
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { type Database } from '@/types/db.types'
import { rateLimiter } from '@/lib/rate-limit'
import { DatabaseError } from '@/lib/supabase'
import { ZodError } from 'zod'

// Define route protection
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)

    // Rate limiting for auth endpoints
    if (request.nextUrl.pathname.startsWith('/auth')) {
      const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
      const { success } = await rateLimiter(ip)
      if (!success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
      }
    }

    const {
      data: { session }
    } = await supabase.auth.getSession()

    // Redirect to dashboard if logged in and trying to access auth routes
    if (session && authRoutes.includes(requestUrl.pathname)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Redirect to login if not logged in and trying to access protected routes
    if (!session && protectedRoutes.some(route => requestUrl.pathname.startsWith(route))) {
      const redirectUrl = new URL('/login', request.url)
      redirectUrl.searchParams.set('redirect', requestUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

// Match these paths
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password', '/reset-password']
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
