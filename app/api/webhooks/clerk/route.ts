import { WebhookEvent } from '@clerk/nextjs/server'
import { sql } from '@vercel/postgres'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Handle the webhook
  try {
    await handleWebhook(evt)

    return new Response('Webhook processed successfully', {
      status: 200
    })
  } catch (err) {
    // Log the error
    await logWebhookError(evt, err)

    return new Response('Webhook processing failed', {
      status: 500
    })
  }
}

async function handleWebhook(evt: WebhookEvent) {
  // Log the webhook
  await logWebhook(evt)

  // Handle different webhook types
  switch (evt.type) {
    case 'user.created':
      await handleUserCreated(evt.data)
      break;
    case 'user.updated':
      await handleUserUpdated(evt.data)
      break;
    case 'user.deleted':
      await handleUserDeleted(evt.data)
      break;
    // Add organization webhooks if needed
    case 'organization.created':
      await handleOrganizationCreated(evt.data)
      break;
    default:
      console.log('Unhandled webhook type:', evt.type)
  }
}

// Webhook logging
async function logWebhook(evt: WebhookEvent) {
  await sql`
    INSERT INTO webhook_logs (
      event_id,
      event_type,
      payload,
      status,
      created_at
    ) VALUES (
      ${evt.data.id},
      ${evt.type},
      ${JSON.stringify(evt.data)},
      'processed',
      NOW()
    )
  `
}

async function logWebhookError(evt: WebhookEvent, error: any) {
  await sql`
    INSERT INTO webhook_logs (
      event_id,
      event_type,
      payload,
      status,
      error,
      created_at
    ) VALUES (
      ${evt.data.id},
      ${evt.type},
      ${JSON.stringify(evt.data)},
      'failed',
      ${JSON.stringify(error)},
      NOW()
    )
  `
}
