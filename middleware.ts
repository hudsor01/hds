export const runtime = 'experimental-edge';

import { auth } from "@/auth"

export default auth;

export const config = {
  matcher: [
    '/dashboard/:path*'
  ]
};
