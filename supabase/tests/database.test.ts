import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/db.types'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

type WaitlistEvent = Database['public']['Tables']['waitlist_events']['Row']

/*
  Temporarily skipping integration tests for database functions.
  Uncomment the tests block below when you have a live Supabase instance and want to run integration tests.
*/

describe.skip('Database Functions', () => {
  const testUser = {
    email: 'test@example.com',
    name: 'Test User'
  }

  const testReferral = {
    email: 'referred@example.com',
    name: 'Referred User',
    referred_by: testUser.email
  }

  beforeAll(async () => {
    // Clean up any existing test data
    await supabase.from('waitlist').delete().in('email', [testUser.email, testReferral.email])
  })

  afterAll(async () => {
    // Clean up test data
    await supabase.from('waitlist').delete().in('email', [testUser.email, testReferral.email])
  })

  it('should create a waitlist entry', async () => {
    const { data, error } = await supabase.from('waitlist').insert([testUser]).select().single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
    if (!data) throw new Error('No data returned')

    expect(data.email).toBe(testUser.email)
    expect(data.position).toBe(1)
    expect(data.status).toBe('pending')
    expect(data.referral_code).toBeDefined()
  })

  it('should handle referrals correctly', async () => {
    const { data: referral, error } = await supabase
      .from('waitlist')
      .insert([testReferral])
      .select()
      .single()

    expect(error).toBeNull()
    expect(referral).toBeDefined()
    if (!referral) throw new Error('No data returned')

    expect(referral.email).toBe(testReferral.email)
    expect(referral.referred_by).toBe(testUser.email)
    expect(referral.position).toBe(2)
  })

  it('should update waitlist position when status changes', async () => {
    // Update first user to invited
    await supabase.from('waitlist').update({ status: 'invited' }).eq('email', testUser.email)

    // Check if second user moved to position 1
    const { data, error } = await supabase
      .from('waitlist')
      .select('position')
      .eq('email', testReferral.email)
      .single()

    expect(error).toBeNull()
    expect(data).toBeDefined()
    if (!data) throw new Error('No data returned')

    expect(data.position).toBe(1)
  })

  it('should log events when status changes', async () => {
    const { data: user } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', testUser.email)
      .single()

    if (!user) throw new Error('User not found')

    const { data: events, error } = await supabase
      .from('waitlist_events')
      .select('*')
      .eq('waitlist_id', user.id)
      .eq('event_type', 'status_change')

    expect(error).toBeNull()
    expect(events).toBeDefined()
    if (!events) throw new Error('No events found')

    expect(events).toHaveLength(1)
    expect(events[0].event_data).toMatchObject({
      old_status: 'pending',
      new_status: 'invited'
    })
  })

  it('should enforce unique email constraint', async () => {
    const { error } = await supabase.from('waitlist').insert([testUser])

    expect(error).toBeDefined()
    if (!error) throw new Error('Expected an error')

    expect(error.code).toBe('23505') // Unique violation
  })
})
