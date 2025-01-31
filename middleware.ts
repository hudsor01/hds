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

export default clerkMiddleware({
  publicRoutes: (req) => {
    const publicPaths = [
      '/',
      '/sign-in',
      '/sign-up',
      '/about',
      '/contact',
      '/api/webhook/clerk',
      '/api/webhook/stripe'
    ];
    return publicPaths.includes(new URL(req.url).pathname);
  },
  ignoredRoutes: ['/api/webhook/clerk', '/api/webhook/stripe'],
  async afterAuth(
    auth: {
      userId: any;
      orgId: any;
      sessionClaims: { role: string; permissions: string | string[] };
    },
    req: { url: string | NextRequest | URL | undefined },
  ) {
    // Debug mode in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Auth middleware:', {
        userId: auth.userId,
        orgId: auth.orgId,
        sessionClaims: auth.sessionClaims,
      });
    }

    // Handle protected routes
    if (isAdminRoute(req.url?.toString())) {
      const isAdmin = auth.sessionClaims?.role === 'admin';
      if (!isAdmin) {
        return Response.redirect(new URL('/dashboard', req.url.toString()));
      }
    }

    if (isTenantRoute(req.url)) {
      if (!auth.userId) {
        const searchParams = new URLSearchParams({
          redirect_url: req.url,
        });
        return Response.redirect(new URL(`/sign-in?${searchParams}`, req.url));
      }
    }

    if (isMaintenanceRoute(req.url)) {
      const canAccessMaintenance = auth.sessionClaims?.permissions?.includes('maintenance:access');
      if (!canAccessMaintenance) {
        return Response.redirect(new URL('/dashboard', req.url));
      }
    }
  },
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
