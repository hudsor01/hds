import { AuthService } from '@/lib/auth/service'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const _userId = '123' // Placeholder until auth is implemented
    const { secret, qrCode } = await AuthService.setupTwoFactor(_userId)
    return NextResponse.json({ secret, qrCode })
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to setup 2FA: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
