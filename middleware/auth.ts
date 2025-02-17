import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/db.types'
import type { CookieOptions } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'],
    {
      cookies: {
        get: (name: string) => {
          return req.cookies.get(name)?.value
        },
        set: (name: string, value: string, options: CookieOptions) => {
          req.cookies.set({
            name,
            value,
            ...options,
            // Convert Supabase cookie options to Next.js cookie options
            sameSite: options.sameSite as 'strict' | 'lax' | 'none' | undefined,
            secure: options.secure,
            maxAge: options.maxAge,
            httpOnly: options.httpOnly,
            path: options.path,
            domain: options.domain
          })
          res.cookies.set({
            name,
            value,
            ...options,
            sameSite: options.sameSite as 'strict' | 'lax' | 'none' | undefined,
            secure: options.secure,
            maxAge: options.maxAge,
            httpOnly: options.httpOnly,
            path: options.path,
            domain: options.domain
          })
        },
        remove: (name: string, options: CookieOptions) => {
          req.cookies.delete({
            name,
            ...options,
            sameSite: options.sameSite as 'strict' | 'lax' | 'none' | undefined,
            secure: options.secure,
            maxAge: options.maxAge,
            httpOnly: options.httpOnly,
            path: options.path,
            domain: options.domain
          })
          res.cookies.delete({
            name,
            ...options,
            sameSite: options.sameSite as 'strict' | 'lax' | 'none' | undefined,
            secure: options.secure,
            maxAge: options.maxAge,
            httpOnly: options.httpOnly,
            path: options.path,
            domain: options.domain
          })
        }
      }
    }
  )

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')
  const isPublicRoute = ['/'] as const
  const isPublicPage = isPublicRoute.includes(req.nextUrl.pathname as '/')

  // Handle authentication routes
  if (!session) {
    // If not authenticated and trying to access protected route
    if (!isAuthPage && !isPublicPage && !isApiRoute) {
      const redirectUrl = new URL('/auth/signin', req.url)
      redirectUrl.searchParams.set('redirect', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  } else {
    // If authenticated and trying to access auth page
    if (isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  // Update session
  await supabase.auth.getSession()

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
} as const
