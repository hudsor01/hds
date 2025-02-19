import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.match(/^\/.*\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next()
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|api/).*)',
  ],
}