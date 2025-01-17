import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

interface Props {
  params: {
    id: string
  }
}

export async function DELETE(
  req: NextRequest,
  props: Props
): Promise<NextResponse> {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Sign out from this session
    if (props.params.id === 'current') {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return NextResponse.json({ success: true })
    }

    // For other sessions, we would implement revoking specific sessions
    // This would require additional Supabase configuration
    return NextResponse.json(
      { error: 'Not implemented' },
      { status: 501 }
    )

  } catch (error) {
    console.error('Session deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
