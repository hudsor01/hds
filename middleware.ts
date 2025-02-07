import {authMiddleware, redirectToSignIn} from '@clerk/nextjs';
import {NextResponse} from 'next/server';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/sign-up', '/pricing', '/about', '/contact'],
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({returnBackUrl: req.url});
    }

    // If the user is signed in and trying to access a public route
    // redirect them to the dashboard
    if (auth.userId && auth.isPublicRoute) {
      const dashboard = new URL('/dashboard', req.url);
      return NextResponse.redirect(dashboard);
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
