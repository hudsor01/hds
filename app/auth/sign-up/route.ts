import { supabase } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withRateLimit } from '@/lib/rate-limit'

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional()
})

export async function POST(request: Request) {
  return withRateLimit(request, async () => {
    try {
      const json = await request.json()
      const body = signUpSchema.parse(json)

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', body.email)
        .single()

      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
          data: {
            name: body.name,
            role: 'USER'
          }
        }
      })

      if (signUpError) {
        // Handle specific error cases
        if (signUpError.message.includes('rate limit')) {
          return NextResponse.json(
            { error: 'Too munknown signup attempts. Please try again later.' },
            { status: 429 }
          )
        }
        return NextResponse.json({ error: signUpError.message }, { status: 400 })
      }

      return NextResponse.json({
        user: data.user,
        session: data.session,
        message: 'Please check your email to confirm your account'
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.issues.reduce(
          (acc, issue) => {
            const field = issue.path[0]
            acc[field] = issue.message
            return acc
          },
          {} as Record<string, string>
        )

        return NextResponse.json({ error: 'Validation failed', fieldErrors }, { status: 400 })
      }

      console.error('Unexpected error during sign up:', error)
      return NextResponse.json(
        { error: 'An unexpected error occurred during sign up' },
        { status: 500 }
      )
    }
  })
}
