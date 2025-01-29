import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';

// Define public routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    return NextResponse.json({ error: 'Authentication Error' }, { status: 401 });
  }

  // Protect all dashboard routes
  if (req.nextUrl.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect all API routes
  if (req.nextUrl.pathname.startsWith('/api/') && !session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
