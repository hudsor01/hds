import { withAuth } from '@/lib/auth/protected-api'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  return withAuth(req, async (userId) => {
    // Your protected API logic here
    return new Response(
      JSON.stringify({
        message: 'This is a protected endpoint',
        userId,
      })
    )
  })
}

export async function POST(req: NextRequest) {
  return withAuth(req, async (userId) => {
    const body = await req.json()

    // Your protected API logic here
    return new Response(
      JSON.stringify({
        message: 'Data received',
        userId,
        data: body,
      })
    )
  })
}
