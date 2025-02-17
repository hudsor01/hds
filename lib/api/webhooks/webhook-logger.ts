import { sql } from '@vercel/postgres'
import { z } from 'zod'

// Define valid webhook event types
const WebhookEventType = z.enum([
  'stripe.payment_intent.succeeded',
  'stripe.payment_intent.failed',
  'stripe.subscription.created',
  'stripe.subscription.updated',
  'stripe.subscription.deleted',
  'auth.user.created',
  'auth.user.updated',
  'auth.user.deleted'
])

type WebhookEventType = z.infer<typeof WebhookEventType>

// Define the structure for webhook event data
const WebhookEventData = z
  .object({
    id: z.string(),
    timestamp: z.number(),
    data: z.record(z.unknown())
  })
  .passthrough()

type WebhookEventData = z.infer<typeof WebhookEventData>

// Define error structure
interface WebhookError {
  code: string
  message: string
  details?: Record<string, string>
}

function isWebhookError(error: unknown): error is WebhookError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as WebhookError).code === 'string' &&
    'message' in error &&
    typeof (error as WebhookError).message === 'string'
  )
}

export const logWebhookEvent = async (type: WebhookEventType, data: WebhookEventData, success: boolean, error?: WebhookError) => {
  const errorString = error
    ? JSON.stringify({
        code: error.code,
        message: error.message,
        details: error.details
      })
    : null

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
     ${errorString},
     NOW()
   )
 `
}
