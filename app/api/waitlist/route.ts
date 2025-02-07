import { prisma } from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend();

export async function GET(req: NextRequest) {
  const supabase = await createClient(cookies());

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
      where: {email: body.email},
    });

    if (existingUser) {
      return NextResponse.json({error: 'Email already registered'}, {status: 400});
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

    return NextResponse.json({success: true});
  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json({error: 'Failed to join waitlist'}, {status: 500});
  }
}

function WelcomeEmail(arg0: {firstName: any; estimatedLaunch: string}) {
  throw new Error('Function not implemented.');
}
