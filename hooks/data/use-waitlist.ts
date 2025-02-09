import { supabase } from '@/lib/supabase'
import type { Database } from '@/types/database.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type Waitlist = Database['public']['Tables']['waitlist']['Row']
type WaitlistInsert = Database['public']['Tables']['waitlist']['Insert']

const WAITLIST_KEYS = {
  all: ['waitlist'] as const,
  position: (email: string) => [...WAITLIST_KEYS.all, 'position', email] as const,
  status: (email: string) => [...WAITLIST_KEYS.all, 'status', email] as const,
}

export function useWaitlistPosition(email: string) {
  return useQuery({
    queryKey: WAITLIST_KEYS.position(email),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waitlist')
        .select('position, status, referral_code')
        .eq('email', email)
        .single()

      if (error) throw error
      if (!data) throw new Error('No data found')

      return data
    },
    enabled: Boolean(email),
  })
}

export function useWaitlistSignup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: WaitlistInsert) => {
      const { data: result, error } = await supabase
        .from('waitlist')
        .insert([data])
        .select()
        .single()

      if (error) throw error
      if (!result) throw new Error('No data returned')

      return result
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: WAITLIST_KEYS.position(data.email),
      })
    },
  })
}

export function useWaitlistReferrals(referralCode: string) {
  return useQuery({
    queryKey: [...WAITLIST_KEYS.all, 'referrals', referralCode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waitlist')
        .select('email, name, created_at')
        .eq('referred_by', referralCode)
        .order('created_at', { ascending: true })

      if (error) throw error
      if (!data) throw new Error('No data found')

      return data
    },
    enabled: Boolean(referralCode),
  })
}

// Admin-only functions
export function useWaitlistAdmin() {
  const queryClient = useQueryClient()

  const updateStatus = useMutation({
    mutationFn: async ({ email, status }: { email: string; status: Waitlist['status'] }) => {
      const { data, error } = await supabase
        .from('waitlist')
        .update({ status })
        .eq('email', email)
        .select()
        .single()

      if (error) throw error
      if (!data) throw new Error('No data found')

      return data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: WAITLIST_KEYS.status(data.email),
      })
    },
  })

  const getWaitlist = useQuery({
    queryKey: WAITLIST_KEYS.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('position', { ascending: true })

      if (error) throw error
      if (!data) throw new Error('No data found')

      return data
    },
  })

  return {
    updateStatus,
    getWaitlist,
  }
}

// Event tracking
export function useWaitlistEvents(waitlistId: string) {
  return useQuery({
    queryKey: [...WAITLIST_KEYS.all, 'events', waitlistId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('waitlist_events')
        .select('*')
        .eq('waitlist_id', waitlistId)
        .order('created_at', { ascending: false })

      if (error) throw error
      if (!data) throw new Error('No data found')

      return data
    },
    enabled: Boolean(waitlistId),
  })
}
