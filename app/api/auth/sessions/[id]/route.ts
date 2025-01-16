import { authService } from '@/lib/auth/service'
import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await authService.revokeSession(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to revoke session: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
