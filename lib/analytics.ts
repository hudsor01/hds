import {track} from '@vercel/analytics';

// Track email events and waitlist metrics
export const analyticsService = {
  trackEmailSent(template: string, userId: string) {
    track('email_sent', {template, userId});
  },

  trackEmailOpened(emailId: string) {
    track('email_opened', {emailId});
  },

  trackWaitlistJoin(position: number) {
    track('waitlist_join', {position});
  },
};
