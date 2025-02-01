import { Database } from '@/types/database.types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// Create a custom Supabase client for server components
export function createServerSupabaseClient() {
  return createServerComponentClient<Database>({
    cookies,
  })
}

// Create a custom Supabase client that injects the Clerk token
export function createClerkSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          'x-clerk-user-id': '{{userId}}',
        },
      },
    }
  )
}
