import { sql } from '@vercel/postgres'

export default async function WebhookLogsPage() {
  const { rows } = await sql<Record<string, any>>`
   SELECT * FROM webhook_logs
   ORDER BY created_at DESC
   LIMIT 100
 `

  if (rows.length === 0) {
    return <div>No webhook logs available.</div>
  }

  return <div>Webhook logs fetched successfully.</div>
}
