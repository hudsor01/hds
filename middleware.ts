import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

// Define route matchers for different access levels
const isAdminRoute = createRouteMatcher(['/admin(.*)', '/api/admin(.*)']);

const isTenantRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  '/features(.*)',
  '/api/tenant(.*)',
]);

const isMaintenanceRoute = createRouteMatcher(['/maintenance(.*)', '/api/maintenance(.*)']);

export default clerkMiddleware((req) => {
  const publicPaths = [
      '/',
      '/sign-in',
      '/sign-up',
      '/about',
      '/contact',
      '/api/webhook/clerk',
      '/api/webhook/stripe'
    ];
     if (publicPaths.includes(new URL(req.url).pathname)) {
    return null;
  }
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
},
});