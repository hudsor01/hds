// types/supabase.d.ts
import { Database } from '@/lib/database.types'
import type { createClient } from '@supabase/supabase-js'

declare global {
  type SupabaseClient = ReturnType<typeof createClient<Database>>
  type UserProfile = Database['public']['Tables']['profiles']['Row']
}
