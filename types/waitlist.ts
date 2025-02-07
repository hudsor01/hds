import type { waitlist, waitlist_events } from '@prisma/client'

export type WaitlistStatus = 'pending' | 'active' | 'verified' | 'blocked';

export type WaitlistEventType =
  | 'signup'
  | 'email_verified'
  | 'referral_created'
  | 'referral_bonus'
  | 'position_updated'
  | 'status_changed';

export interface WaitlistEntry extends waitlist {
  referrals?: WaitlistEntry[];
  events?: WaitlistEvent[];
  referrer?: WaitlistEntry | null;
}

export interface WaitlistEvent extends waitlist_events {
  waitlist?: WaitlistEntry;
}

export interface WaitlistStats {
  total: number;
  averageWaitTime: number;
  medianPosition: number;
  conversionRate: number;
  referralStats: {
    totalReferrals: number;
    averageReferralsPerUser: number;
    topReferrers: Array<{
      email: string;
      referralCount: number;
      positionsGained: number;
    }>;
  };
  statusBreakdown: Record<WaitlistStatus, number>;
  dailySignups: Array<{
    date: string;
    count: number;
  }>;
}

export interface WaitlistReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  positionsGained: number;
  referralHistory: Array<{
    referredEmail: string;
    date: string;
    status: string;
  }>;
}

export interface WaitlistPositionUpdate {
  email: string;
  newPosition: number;
  oldPosition?: number;
  reason?: string;
}

export interface WaitlistVerificationStatus {
  isVerified: boolean;
  verifiedAt?: string;
}

export interface WaitlistJoinRequest {
  email: string;
  name?: string;
  referralCode?: string;
}

export interface WaitlistJoinResponse {
  success: boolean;
  data?: {
    position: number;
    referralCode: string;
  };
  error?: string;
}

// Admin types
export interface WaitlistAdminStats extends WaitlistStats {
  retentionRate: number;
  bounceRate: number;
  emailStats: {
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
  };
  geographicDistribution: Record<string, number>;
}
// vite.config.ts
import { defineConfig } from 'vite'

export interface WaitlistBulkAction {
  action: 'delete' | 'update_status' | 'move_position';
  emails: string[];
  data?: {
    status?: WaitlistStatus;
    position?: number;
  };
}
export default defineConfig({
  // Your Vite configuration here
});
