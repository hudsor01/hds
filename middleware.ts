import {getAuth} from '@clerk/nextjs/server';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export async function middleware(request: NextRequest) {
  const {userId, sessionClaims} = getAuth(request);

  // Check if it's an admin route
  if (request.nextUrl.pathname.startsWith('/admin/waitlist')) {
    if (!userId) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const userRole = (sessionClaims?.metadata?.role as string) || 'USER';

    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Public routes
  const publicRoutes = [
    '/',
    '/sign-in',
    '/sign-up',
    '/api/webhook/clerk',
    '/api/waitlist',
    '/pricing',
    '/contact',
    '/features',
    '/mvp',
  ];

  if (publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check authentication for other routes
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
