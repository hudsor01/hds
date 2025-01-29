'use server';

import { jwtVerify, SignJWT } from 'jose';

import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
  throw new Error('JWT_SECRET_KEY is not set');
}

const key = new TextEncoder().encode(secretKey);

export type Session = {
  userId: string;
  email: string;
  expiresAt: number;
};

export async function createSession(userId: string, email: string): Promise<string> {
  try {
    const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

    const session: Session = {
      userId,
      email,
      expiresAt,
    };

    const token = await new SignJWT(session)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(key);

    (await cookies()).set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(expiresAt),
    });

    return token;
  } catch (error) {
    console.error('Error creating session:', error);
    throw new Error('Failed to create session');
  }
}

export async function getSession(): Promise<Session | null> {
  try {
    const token = (await cookies()).get('session')?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, key);
    const session = payload as Session;

    if (Date.now() > session.expiresAt) {
      (await cookies()).delete('session');
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function deleteSession(): Promise<void> {
  try {
    (await cookies()).delete('session');
  } catch (error) {
    console.error('Error deleting session:', error);
    throw new Error('Failed to delete session');
  }
}
