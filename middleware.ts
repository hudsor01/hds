import {authMiddleware} from '@clerk/nextjs';

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/sign-in*',
    '/sign-up*',
    '/api/webhook/clerk',
    '/api/waitlist',
    '/pricing',
    '/contact',
    '/features',
    '/mvp',
  ],

  // Routes that can be accessed while signed out, but still have clerk session context
  ignoredRoutes: ['/api/webhook/clerk'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
