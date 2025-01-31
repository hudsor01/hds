import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error('Please add CLERK_WEBHOOK_SECRET to .env');
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Error occured -- no svix headers', {
        status: 400,
      });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response('Error occured', {
        status: 400,
      });
    }

    // Handle the webhook
    if (evt.type === 'user.created') {
      const userData = evt.data;
      console.log('Webhook received:', {
        type: evt.type,
        userId: userData.id,
        email: userData.email_addresses[0]?.email_address,
        name: `${userData.first_name} ${userData.last_name}`,
        timestamp: evt.type === 'user.created' ? userData.created_at : userData.updated_at,
      });

      await prisma.user.create({
        data: {
          id: userData.id,
          email: userData.email_addresses[0].email_address,
          name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
          image: userData.image_url,
        },
      });
      console.log('User created successfully in database');
    }
    return new Response('Success', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook error', { status: 500 });
  }
}
