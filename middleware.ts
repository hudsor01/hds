import {clerkMiddleware} from '@clerk/nextjs/server';
import {NextResponse} from 'next/server';

export default clerkMiddleware(
  (auth, request) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Middleware Debug Info:', {
        auth,
        url: request.url,
        nextUrl: request.nextUrl.href,
      });
    }

    return NextResponse.next();
  },
  {debug: process.env.NODE_ENV === 'development'},
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
