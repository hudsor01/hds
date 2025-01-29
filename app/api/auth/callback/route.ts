import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    console.error('No code received in callback');
    return NextResponse.redirect(`${origin}/auth/error`);
  }

  try {
    console.log('Received auth callback with code');
    const cookieStore = cookies();
  } catch (error) {
    console.error('Auth callback error:', error instanceof Error ? error.message : error);
    return NextResponse.redirect(`${origin}/auth/error`);
  }
}
