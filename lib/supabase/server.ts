import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/db.types'

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string) {
        const cookieStore = await cookies()
        return cookieStore.get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions) {
        try {
          ;(await cookies()).set(name, value, options)
        } catch (error) {
          console.error('Error setting cookie:', error)
        }
      },
      async remove(name: string, options: CookieOptions) {
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
export async function getSession() {
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
export async function getUser() {
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
export async function refreshSession() {
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
