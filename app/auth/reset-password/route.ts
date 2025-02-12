import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withRateLimit } from '@/lib/rate-limit'

const resetSchema = z.object({
  email: z.string().email()
})

const updateSchema = z.object({
  password: z.string().min(8)
})

export async function POST(request: Request) {
  return withRateLimit(request, async () => {
    try {
      const json = await request.json()
      const body = resetSchema.parse(json)

      const supabase = await createClient()

      const { error } = await supabase.auth.resetPasswordForEmail(body.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/update-password`
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({
        message: 'Password reset email sent'
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 })
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  })
}

export async function PUT(request: Request) {
  return withRateLimit(request, async () => {
    try {
      const json = await request.json()
      const body = updateSchema.parse(json)

      const supabase = await createClient()

      const { error } = await supabase.auth.updateUser({
        password: body.password
      })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({
        message: 'Password updated successfully'
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 })
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  })
}
