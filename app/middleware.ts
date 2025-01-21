import { createMiddleware } from '@/lib/middleware'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow access to the home page and other public routes
  const publicPaths = ['/', '/about', '/contact', '/features', '/pricing', '/login', '/register']
  const path = request.nextUrl.pathname

  // If it's a public path, allow access
  if (publicPaths.includes(path)) {
    return NextResponse.next()
  }

  // For dashboard and other protected routes, use authentication middleware
  return createMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
