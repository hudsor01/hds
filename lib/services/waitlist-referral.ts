import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { WaitlistPositionService } from './waitlist-position';

export class WaitlistReferralService {
  private static REFERRAL_CODE_LENGTH = 8;
  private static POSITION_BOOST = 5; // Number of positions to move up for each referral

  /**
   * Generate a unique referral code
   */
  static async generateReferralCode(): Promise<string> {
    while (true) {
      const code = nanoid(this.REFERRAL_CODE_LENGTH);
      const {data, error} = await supabase
        .from('waitlist')
        .select('referral_code')
        .eq('referral_code', code)
        .single();

      if (error && !data) {
        return code;
      }
    }
  }

  /**
   * Process a referral when someone joins the waitlist
   */
  static async processReferral(
    newUserEmail: string,
    referralCode: string,
  ): Promise<{success: boolean; referrerEmail?: string}> {
    // Find referrer
    const {data: referrer, error: referrerError} = await supabase
      .from('waitlist')
      .select('email, position')
      .eq('referral_code', referralCode)
      .single();

    if (referrerError || !referrer) {
      return {success: false};
    }

    // Update new user with referral info
    const {error: updateError} = await supabase
      .from('waitlist')
      .update({referred_by: referrer.email})
      .eq('email', newUserEmail);

    if (updateError) {
      console.error('Error updating referral:', updateError);
      return {success: false};
    }

    // Boost referrer's position
    try {
      const newPosition = Math.max(1, referrer.position - this.POSITION_BOOST);
      await WaitlistPositionService.moveToPosition(referrer.email, newPosition);

      // Track referral event
      await supabase.from('waitlist_events').insert([
        {
          email: referrer.email,
          type: 'referral_bonus',
          metadata: {
            referred_email: newUserEmail,
            position_change: this.POSITION_BOOST,
          },
        },
      ]);

      return {success: true, referrerEmail: referrer.email};
    } catch (error) {
      console.error('Error processing referral bonus:', error);
      return {success: false};
    }
  }

  /**
   * Get referral statistics for a user
   */
  static async getReferralStats(email: string): Promise<{
    totalReferrals: number;
    activeReferrals: number;
    positionsGained: number;
    referralHistory: Array<{
      referredEmail: string;
      date: string;
      status: string;
    }>;
  }> {
    const [{count: totalReferrals}, {data: referralEvents}] = await Promise.all([
      supabase
        .from('waitlist')
        .select('*', {count: 'exact', head: true})
        .eq('referred_by', email),
      supabase
        .from('waitlist_events')
        .select('*')
        .eq('email', email)
        .eq('type', 'referral_bonus'),
    ]);

    const positionsGained = referralEvents?.reduce(
      (total, event) => total + (event.metadata?.position_change || 0),
      0,
    );

    const {data: referralHistory} = await supabase
      .from('waitlist')
      .select('email, created_at, status')
      .eq('referred_by', email)
      .order('created_at', {ascending: false});

    return {
      totalReferrals: totalReferrals || 0,
      activeReferrals: referralHistory?.filter(r => r.status === 'active').length || 0,
      positionsGained: positionsGained || 0,
      referralHistory: referralHistory?.map(r => ({
        referredEmail: r.email,
        date: r.created_at,
        status: r.status,
      })) || [],
    };
  }

  /**
   * Get top referrers
   */
  static async getTopReferrers(limit: number = 10): Promise<
    Array<{
      email: string;
      referralCount: number;
      positionsGained: number;
    }>
  > {
    const {data: referrers, error} = await supabase.rpc('get_top_referrers', {
      limit_count: limit,
    });

    if (error) throw error;

    return referrers || [];
  }
}
