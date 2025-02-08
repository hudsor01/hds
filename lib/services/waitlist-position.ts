import { supabase } from '@/lib/supabase';

export class WaitlistPositionService {
  /**
   * Get the current position for a new waitlist entry
   */
  static async getNextPosition(): Promise<number> {
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });
    return (count || 0) + 1;
  }

  /**
   * Update positions for multiple users
   */
  static async updatePositions(
    updates: { email: string; newPosition: number }[],
  ): Promise<void> {
    const { error } = await supabase.from('waitlist').upsert(
      updates.map(({ email, newPosition }) => ({
        email,
        position: newPosition,
        updated_at: new Date().toISOString(),
      })),
    );

    if (error) throw error;
  }

  /**
   * Rebalance positions after deletions or priority changes
   */
  static async rebalancePositions(): Promise<void> {
    const { data: entries, error } = await supabase
      .from('waitlist')
      .select('email, position, created_at')
      .order('position', { ascending: true });

    if (error) throw error;

    const updates = entries.map((entry, index) => ({
      email: entry.email,
      newPosition: index + 1,
    }));

    await this.updatePositions(updates);
  }

  /**
   * Move a user to a specific position
   */
  static async moveToPosition(
    email: string,
    newPosition: number,
  ): Promise<void> {
    const { data: currentEntry, error: fetchError } = await supabase
      .from('waitlist')
      .select('position')
      .eq('email', email)
      .single();

    if (fetchError) throw fetchError;
    if (!currentEntry) throw new Error('User not found in waitlist');

    const currentPosition = currentEntry.position;
    if (currentPosition === newPosition) return;

    // Get affected entries
    const { data: affected, error: affectedError } = await supabase
      .from('waitlist')
      .select('email, position')
      .or(
        `position.gte.${Math.min(currentPosition, newPosition)},position.lte.${Math.max(
          currentPosition,
          newPosition,
        )}`,
      )
      .neq('email', email)
      .order('position', { ascending: true });

    if (affectedError) throw affectedError;

    // Calculate new positions
    const updates = affected.map((entry) => {
      let adjustedPosition = entry.position;
      if (newPosition > currentPosition) {
        if (entry.position > currentPosition && entry.position <= newPosition) {
          adjustedPosition--;
        }
      } else {
        if (entry.position >= newPosition && entry.position < currentPosition) {
          adjustedPosition++;
        }
      }
      return { email: entry.email, newPosition: adjustedPosition };
    });

    // Add the target user's new position
    updates.push({ email, newPosition });

    // Update all positions
    await this.updatePositions(updates);
  }

  /**
   * Get position statistics
   */
  static async getPositionStats(): Promise<{
    total: number;
    averageWaitTime: number;
    medianPosition: number;
  }> {
    const { data: entries, error } = await supabase
      .from('waitlist')
      .select('position, created_at')
      .order('position', { ascending: true });

    if (error) throw error;

    const total = entries.length;
    if (total === 0) {
      return { total: 0, averageWaitTime: 0, medianPosition: 0 };
    }

    // Calculate median position
    const medianPosition = Math.ceil(total / 2);

    // Calculate average wait time in days
    const waitTimes = entries.map((entry) => {
      const createdAt = new Date(entry.created_at);
      const now = new Date();
      return (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
    });

    const averageWaitTime =
      waitTimes.reduce((sum, time) => sum + time, 0) / waitTimes.length;

    return {
      total,
      averageWaitTime,
      medianPosition,
    };
  }
}
