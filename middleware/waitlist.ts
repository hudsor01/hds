import { withRoleAuth } from '@/middleware/auth'
import { NextResponse } from 'next/server'

export const waitlistAdminMiddleware = withRoleAuth(async (req: Request) => {
  const pathname = new URL(req.url).pathname

  // Only protect admin routes
  if (pathname.startsWith('/admin/waitlist')) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/unauthorized', req.url))
}, 'ADMIN')
