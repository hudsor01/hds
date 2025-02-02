import { clerkMiddleware } from "@clerk/nextjs"

export default clerkMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/waitlist",
    "/pricing",
    "/about",
    "/contact",
    "/api/webhook/clerk",
  ],
  // Optional: Prevent access to admin routes
  beforeAuth: (req) => {
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAuthenticated = !!req.auth

    if (isAdminRoute && !isAuthenticated) {
      return Response.redirect(new URL('/sign-in', req.url))
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
