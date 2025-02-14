import { createClient } from '@vercel/postgres'

interface Feedback {
  type: string
  message: string
  metadata: Record<string, unknown>
}

export async function POST(req: Request): Promise<Response> {
  const { type, message, metadata }: Feedback = await req.json()
  const client = createClient()
  await client.connect()
  await client.sql`
    INSERT INTO feedback (type, message, metadata)
    VALUES (${type}, ${message}, ${JSON.stringify(metadata)})
  `
  return new Response('Feedback submitted successfully', { status: 200 })
}
