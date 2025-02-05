import {clerkMiddleware} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

const publicPaths = ['/', '/sign-in', '/sign-up'];

export default clerkMiddleware(req => {
  const {auth} = req;
  const {pathname} = req.nextUrl;

  if (publicPaths.some(path => pathname === path)) {
    return NextResponse.next();
  }

  if (!auth?.userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\.[a-zA-Z0-9]+$|_next).*)'],
};
