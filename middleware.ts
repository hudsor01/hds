import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === '/sign-in' || 
                      path === '/sign-up' || 
                      path === '/' ||
                      path.startsWith('/api/public');

  // Check auth token
  const token = request.cookies.get('auth-token');

  // Redirect unauthenticated users to sign in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Redirect authenticated users away from auth pages
  if (token && (path === '/sign-in' || path === '/sign-up')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
