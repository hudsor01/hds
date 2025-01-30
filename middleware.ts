import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextFetchEvent } from 'next/server';

const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

export default withAuth(
  function middleware(req, event: NextFetchEvent) {
    const { nextUrl } = req;
    const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    // Clone the request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-middleware-cache', 'no-cache');

    if (isPublicRoute || isApiAuthRoute) {
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    // Optional: Add background tasks using waitUntil
    event.waitUntil(
      fetch('/api/auth/log', {
        method: 'POST',
        body: JSON.stringify({ 
          path: nextUrl.pathname,
          timestamp: new Date().toISOString()
        }),
      }).catch(() => {}) // Ignore errors in background task
    );

    return response;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*$).*)'],
};
