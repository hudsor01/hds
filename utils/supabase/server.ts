import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database.types'

export function createClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storage: {
          getItem: (key: string) => {
            const cookieStore = cookies()
            return cookieStore.get(key)?.value
          },
          setItem: (key: string, value: string) => {
            const cookieStore = cookies()
            cookieStore.set(key, value)
          },
          removeItem: (key: string) => {
            const cookieStore = cookies()
            cookieStore.set(key, '', { maxAge: 0 })
          },
        },
      },
    }
  )
}
