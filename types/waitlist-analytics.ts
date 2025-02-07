export interface WaitlistAnalytics {
  total_signups: number;
  daily_signups: number;
  conversion_rate: number;
  referral_count: number;
  average_position: number;
  email_metrics: EmailMetrics;
  growth_rate: number;
  source_breakdown: Record<string, number>;
}

export interface EmailMetrics {
  total_sent: number;
  open_rate: number;
  click_rate: number;
  bounce_rate: number;
  average_time_to_open: number;
}

export interface WaitlistEvent {
  id: string;
  type: WaitlistEventType;
  email: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export type WaitlistEventType =
  | 'signup'
  | 'email_opened'
  | 'link_clicked'
  | 'referral_created'
  | 'position_updated'
  | 'early_access_granted';

export interface WaitlistStats {
  daily: {
    date: string;
    signups: number;
    referrals: number;
  }[];
  sources: {
    name: string;
    count: number;
    percentage: number;
  }[];
  referrals: {
    code: string;
    referrer_email: string;
    referral_count: number;
  }[];
  conversion: {
    total_views: number;
    total_signups: number;
    rate: number;
  };
}
