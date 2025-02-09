import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = await auth()

  if (!userId) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    })
  }

  // Fetch user's properties
  const properties = await sql`
    SELECT * FROM properties
    WHERE user_id = ${userId}
  `

  return NextResponse.json({ properties })
}
