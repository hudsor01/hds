import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/db.types'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
    {
      cookies: {
        get: (name: string) => {
          return req.cookies.get(name)?.value
        },
        set: (name: string, value: string, options: any) => {
          req.cookies.set({ name, value, ...options })
          res.cookies.set({ name, value, ...options })
        },
        remove: (name: string, options: any) => {
          req.cookies.delete({ name, ...options })
          res.cookies.delete({ name, ...options })
        }
      }
    }
  )

  const {
    data: { session }
  } = await supabase.auth.getSession()

  // Auth condition: check if user is signed in
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')
  const isPublicRoute = ['/'].includes(req.nextUrl.pathname)

  // Handle authentication routes
  if (!session) {
    // If not authenticated and trying to access protected route
    if (!isAuthPage && !isPublicRoute && !isApiRoute) {
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
}
