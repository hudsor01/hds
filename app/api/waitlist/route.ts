// app/api/waitlist/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!,
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check for existing email
    const existingUser = await prisma.waitlist.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
    }

    // Create new waitlist entry
    const user = await prisma.waitlist.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        propertyCount: body.propertyCount,
        interests: body.interests,
        referralSource: body.referralSource,
        newsletter: body.newsletter,
      },
    });

    // Send welcome email
    await resend.emails.send({
      from: 'PropertyPro <hello@propertypro.com>',
      to: body.email,
      subject: 'Welcome to the PropertyPro Waitlist!',
      react: WelcomeEmail({
        firstName: body.firstName,
        estimatedLaunch: 'July 2025',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}

function WelcomeEmail(arg0: { firstName: any; estimatedLaunch: string }) {
  throw new Error('Function not implemented.');
}
