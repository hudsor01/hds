import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhooks/clerk',
    '/api/waitlist',
    '/forgot-password',
    '/about',
    '/contact',
    '/features',
    '/pricing',
  ],
  ignoredRoutes: [
    '/api/webhooks/clerk',
  ],
})

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}
