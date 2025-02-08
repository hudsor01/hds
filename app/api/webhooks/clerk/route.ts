import { prisma } from '@/lib/prisma'
import { sql } from '@vercel/postgres'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

async function handleUserCreated(data: WebhookEvent) {
  await prisma.users.create({
    data: {
      email: data.data.email_addresses[0]?.email_address,
      name: `${data.data.first_name} ${data.data.last_name}`,
      role: data.data.private_metadata?.role || 'USER',
    },
  });
}

async function handleUserUpdated(data: WebhookEvent) {
  throw new Error('Function not implemented.');
}

function handleUserDeleted(data: DeletedObjectJSON) {
  throw new Error('Function not implemented.');
}

function handleOrganizationCreated(data: OrganizationJSON) {
  throw new Error('Function not implemented.');
}

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return {
      success: false,
      response: new Response('Missing svix headers', {status: 400}),
    };
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;

    return {
      success: true,
      data: evt,
    };
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return {
      success: false,
      response: new Response('Webhook verification failed', {status: 400}),
    };
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
  `;
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
  `;
}
