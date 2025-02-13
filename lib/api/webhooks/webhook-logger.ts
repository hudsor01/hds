import { sql } from '@vercel/postgres'

export const logWebhookEvent = async (
  type: string,
  data: unknown,
  success: boolean,
  error?: unknown
) => {
  await sql`
   INSERT INTO webhook_logs (
     event_type,
     payload,
     success,
     error,
     created_at
   ) VALUES (
     ${type},
     ${JSON.stringify(data)},
     ${success},
     ${JSON.stringify(error)},
     NOW()
   )
 `
}
