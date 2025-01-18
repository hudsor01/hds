import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  _request: NextRequest,
  _params: { params: { id: string } }
) {
  const supabase = createRouteHandlerClient({ cookies })

  // Delete the session
  await supabase.auth.signOut()

  return NextResponse.json({}, { status: 200 })
}
