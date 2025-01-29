import WaitlistConfirmation from 'components/emails/waitlist-confirmation';
import WaitlistNotification from 'components/emails/waitlist-notification';
import process from 'node:process';
import { Resend } from 'resend';

import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

import { rateLimit } from '../../lib/rate-limit';

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function POST(request: Request) {
  try {
    const { email, name, company } = await request.json();

    // Rate limiting
    const identifier = email.toLowerCase();
    const { success } = await rateLimit(identifier);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    }

    const entry = await prisma.waitlistEntry.create({
      data: {
        email: email.toLowerCase(),
        name,
        company,
      },
    });

    // Get total signups count
    const totalSignups = await prisma.waitlistEntry.count();

    // Send notification email to admin
    if (ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'HDS Waitlist <info@hudsondigitalsolutions.com>',
        to: ADMIN_EMAIL,
        subject: `New Waitlist Registration #${totalSignups}`,
        react: WaitlistNotification({ entry, totalSignups }),
      });

      // Send confirmation email to user
      await resend.emails.send({
        from: 'HDS <info@hudsondigitalsolutions.com>',
        to: email,
        subject: 'Welcome to the HDS Waitlist',
        react: WaitlistConfirmation({ name }),
      });
    }

    return NextResponse.json({ success: true, entry });
  } catch (_error) {
    const errorMessage =
      process.env.NODE_ENV === 'development'
        ? (_error as Error).message
        : 'Failed to join waitlist';

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
