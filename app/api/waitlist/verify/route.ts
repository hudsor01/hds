import { WaitlistVerificationService } from '@/lib/services/waitlist-verification'
import { rateLimitMiddleware } from '@/middleware/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const verifySchema = z.object({
  token: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimit = await rateLimitMiddleware(req, 'waitlist')
    if (rateLimit instanceof NextResponse) {
      return rateLimit
    }

    const body = await req.json()
    const result = verifySchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.issues },
        { status: 400 }
      )
    }

    const { token } = result.data

    const verificationResult = await WaitlistVerificationService.verifyEmail(token)

    if (!verificationResult.success) {
      return NextResponse.json(
        { error: verificationResult.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        email: verificationResult.email,
      },
    })
  } catch (error) {
    console.error('Error in email verification:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Resend verification email
export async function PUT(req: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimit = await rateLimitMiddleware(req, 'waitlist')
    if (rateLimit instanceof NextResponse) {
      return rateLimit
    }

    const body = await req.json()
    const result = z.object({ email: z.string().email() }).safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.issues },
        { status: 400 }
      )
    }

    const { email } = result.data

    const resendResult = await WaitlistVerificationService.resendVerification(email)

    if (!resendResult.success) {
      return NextResponse.json(
        { error: resendResult.error },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resending verification:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
