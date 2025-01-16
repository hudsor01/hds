import { authService, twoFactorSchema } from '@/lib/auth/service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token } = twoFactorSchema.parse(body)

    // In a real app, you would get the secret from the database
    // based on the user's session
    const secret = 'temporary-secret'
    const isValid = await authService.verifyTwoFactor(secret, token)

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid verification code' },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { message: `Invalid request: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 400 }
    )
  }
}
