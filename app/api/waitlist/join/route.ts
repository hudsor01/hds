import {resend} from '@/lib/email';
import {supabase} from '@/lib/supabase';
import {NextRequest, NextResponse} from 'next/server';
import {z} from 'zod';

const joinSchema = z.object({
  email: z.string().email('Invalid email address'),
  referral_code: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {email, referral_code} = joinSchema.parse(body);

    // Check if email already exists
    const {data: existing} = await supabase
      .from('waitlist')
      .select('id, status')
      .eq('email', email)
      .single();

    if (existing) {
      if (existing.status === 'joined') {
        return NextResponse.json({error: 'You have already joined the waitlist'}, {status: 400});
      }
      return NextResponse.json({data: existing});
    }

    // Get current position
    const {count} = await supabase.from('waitlist').select('*', {count: 'exact', head: true});

    const position = (count || 0) + 1;

    // Create waitlist entry
    const {data: entry, error} = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          position,
          status: 'pending',
          referral_code: referral_code || generateReferralCode(),
          referred_by: referral_code || null,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Send welcome email
    await resend.emails.send({
      from: 'Property Manager <waitlist@hudsondigitalsolutions.com>',
      to: email,
      subject: 'Welcome to the Property Manager Waitlist!',
      react: WelcomeEmail({
        position,
        referralCode: entry.referral_code,
      }),
    });

    // Update referrer's position if applicable
    if (referral_code) {
      const {data: referrer} = await supabase
        .from('waitlist')
        .select('position')
        .eq('referral_code', referral_code)
        .single();

      if (referrer) {
        // Move referrer up by 1 position
        await supabase.rpc('update_waitlist_positions', {
          p_referrer_position: referrer.position,
          p_new_position: Math.max(1, referrer.position - 1),
        });
      }
    }

    return NextResponse.json({data: entry});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({error: error.errors[0].message}, {status: 400});
    }
    console.error('Error in waitlist join:', error);
    return NextResponse.json({error: 'Failed to join waitlist'}, {status: 500});
  }
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
