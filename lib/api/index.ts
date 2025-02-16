import { createClient } from '@/utils/supabase/server'
import { Database } from '@/types/supabase'

export type { Database }

export async function createServerSupabaseClient() {
  return createClient()
}

export * from './dashboard'
export * from './client'
