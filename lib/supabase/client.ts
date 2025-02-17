import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/db.types'

const supabaseUrl: string = process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? ''
const supabaseAnonKey: string = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] ?? ''

export const createClient = (): ReturnType<typeof createBrowserClient> => {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

export const supabase = createClient()

// Custom error classes for better error handling
export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'SupabaseError'
  }
}

export class ValidationError extends SupabaseError {
  constructor(message: string, details?: string) {
    super(message, 'VALIDATION_ERROR', details, 400)
    this.name = 'ValidationError'
  }
}

export class AuthError extends SupabaseError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', undefined, 401)
    this.name = 'AuthError'
  }
}
