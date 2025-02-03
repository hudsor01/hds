import {authMiddleware} from '@clerk/nextjs';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks/clerk',
    '/api/waitlist',
    '/about',
    '/contact',
    '/pricing',
    '/features',
    '/forgot-password',
  ],
  ignoredRoutes: ['/api/webhooks/clerk', '/_next/static/(.*)', '/favicon.ico'],
  debug: process.env.NODE_ENV === 'development',
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
