import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/db.types'

export const createClient = (): ReturnType<typeof createServerClient> => {
  const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseAnonKey: string = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string): Promise<string | undefined> {
        const cookieStore = await cookies()
        return cookieStore.get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions): Promise<void> {
        try {
          ;(await cookies()).set(name, value, options)
        } catch (error) {
          console.error('Error setting cookie:', error)
        }
      },
      async remove(name: string, options: CookieOptions): Promise<void> {
        try {
          ;(await cookies()).delete({ name, ...options })
        } catch (error) {
          console.error('Error removing cookie:', error)
        }
      }
    }
  })
}

// Helper function to get the current session
export async function getSession(): Promise<ReturnType<typeof createClient>['auth']['getSession']> {
  const supabase = createClient()
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

// Helper function to get the current user
export async function getUser(): Promise<ReturnType<typeof createClient>['auth']['getUser']> {
  const supabase = createClient()
  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()
    if (error) throw error
    return user
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}

// Helper function to refresh session if needed
export async function refreshSession(): Promise<ReturnType<typeof createClient>['auth']['refreshSession']> {
  const supabase = createClient()
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.refreshSession()
    if (error) throw error
    return session
  } catch (error) {
    console.error('Error refreshing session:', error)
    return null
  }
}
