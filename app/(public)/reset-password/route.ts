import supabase from '../../../lib/supabase'
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import type { AuthError } from '@supabase/supabase-js'
import process from 'process'

const resetSchema = z.object({
  email: z.string().email('Invalid email address')
})

const updateSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters')
})

function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'message' in error && 'status' in error
}

function handleError(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Validation Error',
        details: error.errors
      },
      { status: 400 }
    )
  }

  if (isAuthError(error)) {
    return NextResponse.json(
      {
        error: 'Authentication Error',
        message: error.message
      },
      { status: 401 }
    )
  }

  console.error('Error:', error)
  return NextResponse.json(
    {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  )
}

function withRateLimit(
  return withRateLimit(request, async () => {
    try {
      const json = await request.json() as { email: string }
      const body = resetSchema.parse(json)

      const { data, error: authError } = await supabase.auth.resetPasswordForEmail(body.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/update-password`
      })

      if (authError) throw authError

      return NextResponse.json({
        message: 'Password reset email sent'
      })
    } catch (err) {
      return handleError(err)
    }
  })

      return NextResponse.json({
export async function PUT(request: NextRequest): Promise<NextResponse> {
  return withRateLimit(request, async () => {
    try {
      const json = await request.json() as { password: string }
      const body = updateSchema.parse(json)

      const { data, error: authError } = await supabase.auth.updateUser({
        password: body.password
      })

      if (authError) throw authError

      return NextResponse.json({
        message: 'Password updated successfully'
      })
    } catch (err) {
      return handleError(err)
    }
  })
}
      return NextResponse.json({
        message: 'Password updated successfully'
      })
    } catch (error) {
      return handleError(error)
    }
  })
}
