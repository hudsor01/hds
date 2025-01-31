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

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response('Missing Svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return new Response('Verification failed', { status: 400 });
    }

    switch (evt.type) {
      case 'user.created':
        const userData = evt.data;
        await prisma.user.create({
          data: {
            clerkId: userData.id,
            email: userData.email_addresses[0]?.email_address,
            name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
            image: userData.image_url,
            role: 'USER',
            subscriptionStatus: 'INACTIVE',
          },
        });
        break;

      case 'user.updated':
        const updatedUser = evt.data;
        await prisma.user.update({
          where: { clerkId: updatedUser.id },
          data: {
            email: updatedUser.email_addresses[0]?.email_address,
            name: `${updatedUser.first_name || ''} ${updatedUser.last_name || ''}`.trim(),
            image: updatedUser.image_url,
          },
        });
        break;

      case 'user.deleted':
        await prisma.user.delete({
          where: { clerkId: evt.data.id },
        });
        break;

      case 'organization.created':
        const orgData = evt.data;
        await prisma.organization.create({
          data: {
            clerkId: orgData.id,
            name: orgData.name,
            slug: orgData.slug,
            imageUrl: orgData.image_url,
          },
        });
        break;

      default:
        console.log(`Unhandled webhook event type: ${evt.type}`);
    }
    return new Response('Webhook processed', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    if (error instanceof Error) {
      return new Response(`Webhook error: ${error.message}`, { status: 500 });
    }
    return new Response('Webhook processing failed', { status: 500 });
  }
}
