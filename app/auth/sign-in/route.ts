'use server'

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import type { AuthError } from '@supabase/supabase-js'

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
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

  globalThis.console.error('Error:', error)
  return NextResponse.json(
    {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    },
    { status: 500 }
  )
}

function withRateLimit<T>(request: NextRequest, callback: () => Promise<T>): Promise<T> {
  return callback()
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  return await withRateLimit(request, async () => {
    try {
      const json: unknown = await request.json()
      const body = signInSchema.parse(json)

      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password
      })

      if (error) throw error

      return NextResponse.json({
        user: data.user,
        session: data.session
      })
    } catch (error) {
      return handleError(error)
    }
  })
}
