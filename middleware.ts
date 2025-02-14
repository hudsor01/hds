import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { type Database } from '@/types/db.types'
import { rateLimiter } from '@/lib/rate-limit'
import { DatabaseError } from '@/lib/supabase'
import { ZodError } from 'zod'

// Define route protection
const authRoutes = ['/login', '/signup', '/forgot-password', '/reset-password']
const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest): Promise<NextResponse> {
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

    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

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
