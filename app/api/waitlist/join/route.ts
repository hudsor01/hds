import { WaitlistPositionService } from '@/lib/services/waitlist-position';
import { WaitlistReferralService } from '@/lib/services/waitlist-referral';
import { WaitlistVerificationService } from '@/lib/services/waitlist-verification';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const joinSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  referralCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = joinSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: result.error.issues },
        { status: 400 },
      );
    }

    const { email, name, referralCode } = result.data;

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 },
      );
    }

    // Get next position
    const position = await WaitlistPositionService.getNextPosition();

    // Create waitlist entry
    const { data: entry, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          name,
          position,
          referral_code: await WaitlistReferralService.generateReferralCode(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating waitlist entry:', error);
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 },
      );
    }

    // Process referral if code provided
    if (referralCode) {
      await WaitlistReferralService.processReferral(email, referralCode);
    }

    // Send verification email
    await WaitlistVerificationService.sendVerificationEmail(email);

    return NextResponse.json({
      success: true,
      data: {
        position: entry.position,
        referralCode: entry.referral_code,
      },
    });
  } catch (error) {
    console.error('Error in waitlist join:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
