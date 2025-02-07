import {supabase} from '@/lib/supabase';
import type {WaitlistEvent, WaitlistEventType, WaitlistStats} from '@/types/waitlist-analytics';

export async function trackWaitlistEvent(
  email: string,
  type: WaitlistEventType,
  metadata?: Record<string, any>,
) {
  const {error} = await supabase.from('waitlist_events').insert([
    {
      email,
      type,
      metadata,
      timestamp: new Date().toISOString(),
    },
  ]);

  if (error) throw error;
}

export async function getWaitlistStats(
  startDate?: string,
  endDate?: string,
): Promise<WaitlistStats> {
  const now = new Date();
  const start = startDate ? new Date(startDate) : new Date(now.setDate(now.getDate() - 30));
  const end = endDate ? new Date(endDate) : new Date();

  // Get daily signups and referrals
  const {data: daily, error: dailyError} = await supabase
    .from('waitlist_events')
    .select('type, timestamp')
    .gte('timestamp', start.toISOString())
    .lte('timestamp', end.toISOString());

  if (dailyError) throw dailyError;

  // Get referral stats
  const {data: referrals, error: referralError} = await supabase
    .from('waitlist')
    .select('email, referral_code, referred_by')
    .not('referred_by', 'is', null);

  if (referralError) throw referralError;

  // Get source breakdown
  const {data: sources, error: sourceError} = await supabase
    .from('waitlist_events')
    .select('metadata->source')
    .eq('type', 'signup');

  if (sourceError) throw sourceError;

  // Get conversion stats
  const {data: views, error: viewError} = await supabase
    .from('waitlist_events')
    .select('id')
    .eq('type', 'page_view');

  if (viewError) throw viewError;

  const {data: signups, error: signupError} = await supabase
    .from('waitlist_events')
    .select('id')
    .eq('type', 'signup');

  if (signupError) throw signupError;

  // Process daily stats
  const dailyStats = new Map<string, {signups: number; referrals: number}>();
  daily.forEach(event => {
    const date = event.timestamp.split('T')[0];
    const stats = dailyStats.get(date) || {signups: 0, referrals: 0};
    if (event.type === 'signup') stats.signups++;
    if (event.type === 'referral_created') stats.referrals++;
    dailyStats.set(date, stats);
  });

  // Process source breakdown
  const sourceCount = new Map<string, number>();
  sources.forEach(({source}) => {
    if (source) {
      sourceCount.set(source, (sourceCount.get(source) || 0) + 1);
    }
  });

  // Process referral stats
  const referralStats = new Map<string, {email: string; count: number}>();
  referrals.forEach(({email, referral_code}) => {
    const count = referrals.filter(r => r.referred_by === referral_code).length;
    if (count > 0) {
      referralStats.set(referral_code, {email, count});
    }
  });

  return {
    daily: Array.from(dailyStats.entries()).map(([date, stats]) => ({
      date,
      ...stats,
    })),
    sources: Array.from(sourceCount.entries()).map(([name, count]) => ({
      name,
      count,
      percentage: (count / sources.length) * 100,
    })),
    referrals: Array.from(referralStats.entries()).map(([code, {email, count}]) => ({
      code,
      referrer_email: email,
      referral_count: count,
    })),
    conversion: {
      total_views: views.length,
      total_signups: signups.length,
      rate: views.length ? (signups.length / views.length) * 100 : 0,
    },
  };
}

export async function getWaitlistEvents(
  email: string,
  type?: WaitlistEventType,
): Promise<WaitlistEvent[]> {
  let query = supabase
    .from('waitlist_events')
    .select('*')
    .eq('email', email)
    .order('timestamp', {ascending: false});

  if (type) {
    query = query.eq('type', type);
  }

  const {data, error} = await query;
  if (error) throw error;
  return data;
}

export async function updateWaitlistPosition(email: string, newPosition: number) {
  const {error} = await supabase
    .from('waitlist')
    .update({position: newPosition})
    .eq('email', email);

  if (error) throw error;

  await trackWaitlistEvent(email, 'position_updated', {new_position: newPosition});
}
