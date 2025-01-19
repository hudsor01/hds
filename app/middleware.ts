import { auth } from "@/auth"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export default auth((req: NextRequest & { nextauth?: { token: string | null } }) => {
  const { nextUrl } = req
  const isLoggedIn = req.nextauth?.token !== null

  // Get the pathname safely
  const pathname = nextUrl?.pathname || ''

  // Protected routes that require authentication
  const protectedPaths = ['/dashboard', '/properties', '/tenants', '/maintenance']
  const isProtectedRoute = protectedPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))

  // Auth routes that should redirect to dashboard if logged in
  const authPaths = ['/login', '/signup']
  const isAuthRoute = authPaths.some(path => pathname === path)

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthRoute && isLoggedIn) {
    const dashboardUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/properties/:path*',
    '/tenants/:path*',
    '/maintenance/:path*',
    '/login',
    '/signup'
  ],
  runtime: 'nodejs'
}
