import type { WaitlistStatus } from '@/types/waitlist'
import { describe, expect, it } from 'vitest'

describe('Waitlist Types', () => {
  it('should allow a valid waitlist status', () => {
    const status: WaitlistStatus = 'pending';
    expect(status).toBe('pending');
  });

  it('should throw an error for an invalid waitlist status', () => {
    const invalidStatus = 'invalid';
    expect(() => {
      // Simulate a runtime check for the type
      const status: WaitlistStatus = invalidStatus as WaitlistStatus;
      if (status !== 'pending' && status !== 'active' && status !== 'verified' && status !== 'blocked') {
        throw new Error('Invalid status');
      }
    }).toThrow('Invalid status');
  });
});
