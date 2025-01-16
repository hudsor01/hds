import { SessionPayload } from '@/lib/definitions'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import 'server-only'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession (userId: string)
{
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({
      user: {
        id: userId,
        email: '',  // Add actual email if available
        name: null,
        role: 'USER'
      },
      exp: Math.floor(expiresAt.getTime() / 1000)
    })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error(`Session error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    return null
  }
}
