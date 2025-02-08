import { supabase } from '@/lib/supabase';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { z } from 'zod';

// Webhook secret from environment variable
const WEBHOOK_SECRET = process.env.WAITLIST_WEBHOOK_SECRET;

// Webhook event schema
const webhookSchema = z.object({
  type: z.enum([
    'waitlist.joined',
    'waitlist.verified',
    'waitlist.referred',
    'waitlist.position_updated',
    'waitlist.status_changed',
  ]),
  data: z.object({
    email: z.string().email(),
    timestamp: z.string().datetime(),
    metadata: z.record(z.unknown()).optional(),
  }),
});

export async function POST(req: Request) {
  try {
    if (!WEBHOOK_SECRET) {
      console.error('Missing WAITLIST_WEBHOOK_SECRET');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 },
      );
    }

    // Get the webhook signature from headers
    const headersList = headers();
    const svixHeaders = {
      'svix-id': headersList.get('svix-id'),
      'svix-timestamp': headersList.get('svix-timestamp'),
      'svix-signature': headersList.get('svix-signature'),
    };

    // Validate webhook signature
    if (
      !svixHeaders['svix-id'] ||
      !svixHeaders['svix-timestamp'] ||
      !svixHeaders['svix-signature']
    ) {
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 401 },
      );
    }

    // Create Webhook instance for verification
    const wh = new Webhook(WEBHOOK_SECRET);
    const payload = await req.json();

    try {
      wh.verify(JSON.stringify(payload), svixHeaders);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 },
      );
    }

    // Validate webhook payload
    const result = webhookSchema.safeParse(payload);
    if (!result.success) {
      console.error('Invalid webhook payload:', result.error);
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 },
      );
    }

    const { type, data } = result.data;

    // Process webhook based on type
    switch (type) {
      case 'waitlist.joined':
        await handleWaitlistJoined(data);
        break;
      case 'waitlist.verified':
        await handleWaitlistVerified(data);
        break;
      case 'waitlist.referred':
        await handleWaitlistReferred(data);
        break;
      case 'waitlist.position_updated':
        await handlePositionUpdated(data);
        break;
      case 'waitlist.status_changed':
        await handleStatusChanged(data);
        break;
      default:
        console.warn('Unhandled webhook type:', type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

async function handleWaitlistJoined(
  data: z.infer<typeof webhookSchema>['data'],
) {
  await supabase.from('waitlist_events').insert([
    {
      email: data.email,
      type: 'signup',
      metadata: data.metadata,
      timestamp: data.timestamp,
    },
  ]);
}

async function handleWaitlistVerified(
  data: z.infer<typeof webhookSchema>['data'],
) {
  await supabase.from('waitlist_events').insert([
    {
      email: data.email,
      type: 'email_verified',
      metadata: data.metadata,
      timestamp: data.timestamp,
    },
  ]);
}

async function handleWaitlistReferred(
  data: z.infer<typeof webhookSchema>['data'],
) {
  await supabase.from('waitlist_events').insert([
    {
      email: data.email,
      type: 'referral_created',
      metadata: data.metadata,
      timestamp: data.timestamp,
    },
  ]);
}

async function handlePositionUpdated(
  data: z.infer<typeof webhookSchema>['data'],
) {
  await supabase.from('waitlist_events').insert([
    {
      email: data.email,
      type: 'position_updated',
      metadata: data.metadata,
      timestamp: data.timestamp,
    },
  ]);
}

async function handleStatusChanged(
  data: z.infer<typeof webhookSchema>['data'],
) {
  await supabase.from('waitlist_events').insert([
    {
      email: data.email,
      type: 'status_changed',
      metadata: data.metadata,
      timestamp: data.timestamp,
    },
  ]);
}
