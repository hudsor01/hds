import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withRateLimit } from '@/lib/rate-limit'

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function POST(request: Request) {
  return withRateLimit(request, async () => {
    try {
      const json = await request.json()
      const body = signInSchema.parse(json)

      const supabase = await createClient()

      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: body.email,
        password: body.password,
      })

      if (signInError) {
        return NextResponse.json({ error: signInError.message }, { status: 400 })
      }

      return NextResponse.json({
        user: data.user,
        session: data.session,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json({ error: error.issues }, { status: 400 })
      }

      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
  })
}
