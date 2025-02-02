import { clerkMiddleware } from '@clerk/nextjs'

export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/api/webhooks/clerk',
    '/api/waitlist',
    '/sign-in',
    '/sign-up',
    '/forgot-password',
  ],
  ignoredRoutes: [
    '/api/webhooks/clerk',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
