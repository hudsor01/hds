import {supabase} from '@/lib/supabase';
import type {WaitlistStats} from '@/types/waitlist-analytics';
import Papa from 'papaparse';

interface ExportOptions {
  format: 'csv' | 'json';
  includeAnalytics?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export async function exportWaitlistData(options: ExportOptions) {
  // Fetch waitlist entries
  const {data: entries, error: entriesError} = await supabase
    .from('waitlist')
    .select('*')
    .order('position', {ascending: true});

  if (entriesError) throw entriesError;

  // Fetch analytics if requested
  let analytics: WaitlistStats | undefined;
  if (options.includeAnalytics) {
    const {data: events, error: eventsError} = await supabase
      .from('waitlist_events')
      .select('*')
      .order('timestamp', {ascending: false});

    if (eventsError) throw eventsError;

    // Process events into analytics
    analytics = processEvents(events);
  }

  // Prepare export data
  const exportData = {
    entries: entries.map(entry => ({
      email: entry.email,
      position: entry.position,
      status: entry.status,
      referral_code: entry.referral_code,
      referred_by: entry.referred_by,
      joined_at: entry.created_at,
    })),
    ...(analytics && {analytics}),
  };

  // Return in requested format
  if (options.format === 'csv') {
    return Papa.unparse(exportData.entries);
  }

  return JSON.stringify(exportData, null, 2);
}

function processEvents(events: any[]): WaitlistStats {
  const stats: WaitlistStats = {
    daily: [],
    sources: [],
    referrals: [],
    conversion: {
      total_views: 0,
      total_signups: 0,
      rate: 0,
    },
  };

  // Group events by date
  const dailyMap = new Map<string, {signups: number; referrals: number}>();
  const sourceMap = new Map<string, number>();
  const referralMap = new Map<string, {email: string; count: number}>();

  events.forEach(event => {
    const date = event.timestamp.split('T')[0];

    // Update daily stats
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {signups: 0, referrals: 0});
    }
    const dayStats = dailyMap.get(date)!;
    if (event.type === 'signup') dayStats.signups++;
    if (event.type === 'referral_created') dayStats.referrals++;

    // Update source stats
    if (event.type === 'signup' && event.metadata?.source) {
      const source = event.metadata.source as string;
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1);
    }

    // Update conversion stats
    if (event.type === 'page_view') stats.conversion.total_views++;
    if (event.type === 'signup') stats.conversion.total_signups++;
  });

  // Format stats
  stats.daily = Array.from(dailyMap.entries()).map(([date, counts]) => ({
    date,
    ...counts,
  }));

  stats.sources = Array.from(sourceMap.entries()).map(([name, count]) => ({
    name,
    count,
    percentage: (count / stats.conversion.total_signups) * 100,
  }));

  stats.conversion.rate = stats.conversion.total_views
    ? (stats.conversion.total_signups / stats.conversion.total_views) * 100
    : 0;

  return stats;
}
