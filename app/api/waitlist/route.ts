import { prisma } from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WaitlistPositionService } from '@/lib/services/waitlist-position';

const resend = new Resend();

export async function GET(_req: NextRequest) {
  void _req;
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from('waitlist').select('*');

    if (error) throw error;

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json({ error: 'Failed to fetch waitlist' }, { status: 500 });
  }
}

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

    const position = await WaitlistPositionService.getNextPosition();

    // Create new waitlist entry without assigning to a variable
    await prisma.waitlist.create({
      data: {
        email: body.email,
        name: body.name,
        position: position,
      },
    });

    // Send welcome email
    await resend.emails.send({
      from: 'PropertyPro <hello@propertypro.com>',
      to: body.email,
      subject: 'Welcome to the PropertyPro Waitlist!',
      react: WelcomeEmail({
        firstName: body.name,
        estimatedLaunch: 'July 2025',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
  }
}

function WelcomeEmail({
  firstName,
  estimatedLaunch,
}: {
  firstName: string;
  estimatedLaunch: string;
}): string {
  const element = React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', fontSize: '16px', color: '#333' } },
    React.createElement(
      'h1',
      { style: { color: '#007FFF' } },
      `Welcome to PropertyPro, ${firstName}!`
    ),
    React.createElement(
      'p',
      null,
      "Thank you for joining our waitlist. We're excited to have you on board."
    ),
    React.createElement(
      'p',
      null,
      `Our estimated launch date is ${estimatedLaunch}. Stay tuned for more updates.`
    ),
    React.createElement('p', null, 'Best regards,'),
    React.createElement('p', null, 'The PropertyPro Team')
  );
  return renderToStaticMarkup(element);
}
