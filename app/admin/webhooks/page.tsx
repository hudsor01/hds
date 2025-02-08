import { WebhookLogGrid } from '@/app/admin/webhooks/webhook-log-grid';
import type { WebhookLog } from '@/types/webhooks';
import { sql } from '@vercel/postgres';

export default async function WebhookLogsPage() {
  const { rows } = await sql<WebhookLog>`
   SELECT * FROM webhook_logs
   ORDER BY created_at DESC
   LIMIT 100
 `;

  return <WebhookLogGrid logs={rows} />;
}
