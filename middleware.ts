import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { createRedirectUrl, isPublicPath } from '@/utils/auth-redirect'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          })
        },
      },
    }
  )

  const { data: { user }, error } = await supabase.auth.getUser()

  // Handle auth redirects
  const isPublic = isPublicPath(request.nextUrl.pathname)
  const isAuthed = !!user && !error

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthed && !isPublic) {
    const redirectUrl = createRedirectUrl(request.nextUrl.pathname)
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }

  // If the user is authenticated and trying to access auth pages
  if (isAuthed && ['/sign-in', '/sign-up', '/forgot-password'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions (.svg, .png, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
