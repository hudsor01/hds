export const runtime = 'experimental-edge';

import { auth } from "@/auth"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export default auth((req: NextRequest) => {
  // Auth.js will handle the authentication check
  const { nextUrl } = req
  const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
  const isOnAuth = nextUrl.pathname.startsWith('/login') ||
                  nextUrl.pathname.startsWith('/signup')

  if (isOnDashboard) {
    // Auth.js will handle the redirect if not authenticated
    return NextResponse.next()
  }

  if (isOnAuth) {
    // Auth.js will handle the redirect if already authenticated
    return NextResponse.next()
  }

  return NextResponse.next()
})

// Optionally configure middleware to run only on specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup']
}
