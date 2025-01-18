// src/middleware.ts
import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge"

export const runtime = 'edge'; // Add this line

export default withMiddlewareAuthRequired();

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
};
