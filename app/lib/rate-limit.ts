import { createClient } from '@supabase/supabase-js'
import process from 'node:process'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function rateLimit(identifier: string) {
  const now = new Date()
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  // Count attempts in the last 24 hours
  const { count } = await supabase
    .from('waitlist_attempts')
    .select('*', { count: 'exact' })
    .eq('identifier', identifier)
    .gte('created_at', twentyFourHoursAgo.toISOString())

  const remaining = 5 - (count || 0)
  const success = remaining > 0

  if (success) {
    // Record this attempt
    await supabase
      .from('waitlist_attempts')
      .insert({ identifier, created_at: now.toISOString() })
  }

  return {
    success,
    limit: 5,
    remaining,
    reset: new Date(now.getTime() + 24 * 60 * 60 * 1000)
  }
}
