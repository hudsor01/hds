import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { signToken, verifyToken } from '@/lib/auth/session'

// Define protected routes constant
const PROTECTED_ROUTES = [
  '/dashboard',
  '/settings',
  '/properties',
  '/tenants',
  '/leases',
  '/maintenance'
] as const

// Type for protected routes
type ProtectedRoute = typeof PROTECTED_ROUTES[number]

// Interface for session data
interface SessionData {
  userId: string
  email: string
  role: string
  expires: string
  [key: string]: unknown
}

// Error types
class SessionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SessionError'
  }
}

/**
 * Checks if a pathname is a protected route
 * @param pathname - The pathname to check
 * @returns boolean indicating if the route is protected
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route))
}

/**
 * Middleware function to handle authentication and session management
 * @param request - The incoming request
 * @returns NextResponse
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl
  const sessionCookie = request.cookies.get('session')
  const isProtected = isProtectedRoute(pathname)

  // Redirect to sign-in if accessing protected route without session
  if (isProtected && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  let response = NextResponse.next()

  if (sessionCookie) {
    try {
      // Verify and parse session token
      const parsed = await verifyToken(sessionCookie.value) as SessionData
      
      // Set expiration for one day from now
      const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000)

      // Set new session cookie with updated expiration
      response.cookies.set({
        name: 'session',
        value: await signToken({
          ...parsed,
          expires: expiresInOneDay.toISOString()
        }),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresInOneDay,
        path: '/'
      })

      // Add user info to request headers for server components
      response.headers.set('X-User-Id', parsed.userId)
      response.headers.set('X-User-Role', parsed.role)
      
    } catch (error) {
      // Handle session verification errors
      console.error('Session verification failed:', error instanceof Error ? error.message : 'Unknown error')
      
      // Delete invalid session cookie
      response.cookies.delete('session')
      
      // Redirect to sign-in if on protected route
      if (isProtected) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
      }
    }
  }

  return response
}

/**
 * Middleware matcher configuration
 * Excludes static files, API routes, and other special paths
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)'
  ]
}
