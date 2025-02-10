import type { WaitlistJoinRequest, WaitlistJoinResponse } from '@/types/waitlist';

export async function submitWaitlist(
  requestData: WaitlistJoinRequest
): Promise<WaitlistJoinResponse> {
  try {
    const response = await globalThis.fetch('/api/waitlist/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });

    const data: WaitlistJoinResponse = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to join waitlist');
    }

    return data;
  } catch (error) {
    throw error instanceof Error ? error : new Error('An unknown error occurred');
  }
}
