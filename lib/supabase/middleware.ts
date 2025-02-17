import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options
        })
        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        })
        response.cookies.set({
          name,
          value,
          ...options
        })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options
        })
        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        })
        response.cookies.set({
          name,
          value: '',
          ...options
        })
      }
    }
  })

  const {
    data: { session },
    error
  } = await supabase.auth.getSession()

  // Handle authentication error
  if (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }

  // Protected routes
  const protectedPaths = ['/dashboard', '/properties', '/tenants', '/maintenance']
  const pathIsProtected = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (pathIsProtected && !session) {
    const redirectUrl = new URL('/auth/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Auth routes - redirect to dashboard if already logged in
  const authPaths = ['/auth/login', '/auth/register']
  const pathIsAuth = authPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (pathIsAuth && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
