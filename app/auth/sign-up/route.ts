import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { withRateLimit } from '@/lib/rate-limit'

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
})

export async function POST(request: Request) {
  return withRateLimit(request, async () => {
    try {
      const json = await request.json()
      const body = signUpSchema.parse(json)

      const supabase = await createClient()

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: body.email,
        password: body.password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
          data: {
            name: body.name,
            role: 'USER',
          },
        },
      })

      if (signUpError) {
        return NextResponse.json({ error: signUpError.message }, { status: 400 })
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
