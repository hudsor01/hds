import { useAuth } from '@clerk/nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const { getToken } = useAuth();

export async function createMiddleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // If user is not logged in, redirect to login page
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow access to protected routes for authenticated users
  return NextResponse.next();
}
