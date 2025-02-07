import {rateLimitMiddleware} from '@/middleware/rate-limit';
import {RedirectToSignIn, getAuth} from '@clerk/nextjs';
import type {NextFetchEvent, NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

export default async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Apply rate limiting first
  const rateLimitResponse = await rateLimitMiddleware(request);
  if (rateLimitResponse.status === 429) {
    return rateLimitResponse;
  }
  const {userId} = getAuth(request);

  if (!userId && !request.url.includes('/sign-in')) {
    return RedirectToSignIn({redirectUrl: request.url});
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
