import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { createServerClient as createSupabaseServerClient, CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from '@/types/db.types'

// Create browser (client-side) Supabase client
export const createClient = () => {
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']
  const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']
  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Create server-side Supabase client
export const createServerClient = () => {
  const cookieStore = cookies()
  const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL']
  const supabaseAnonKey = process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']

  return createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => {
        const cookiesArray = cookieStore.getAll()
        return cookiesArray.map(cookie => ({ name: cookie.name, value: cookie.value }))
      },
      setAll: (newCookies: { name: string; value: string }[], options: CookieOptions, res: Response) => {
        newCookies.forEach(cookie => {
          cookieStore.set({ name: cookie.name, value: cookie.value, ...options })
        })
      },
      remove: (name: string, options: CookieOptions) => {
        cookieStore.delete(name, options)
      }
    }
  })
}

// Enhanced error handling with specific error types
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export class ValidationError extends DatabaseError {
  constructor(message: string, details?: string) {
    super(message, 'VALIDATION_ERROR', details, 400)
    this.name = 'ValidationError'
  }
}

export class AuthorizationError extends DatabaseError {
  constructor(message: string) {
    super(message, 'AUTHORIZATION_ERROR', undefined, 403)
    this.name = 'AuthorizationError'
  }
}

interface DetailedError {
  details: string
  code?: string
}

function hasDetails(error: unknown): error is DetailedError {
  return typeof error === 'object' && error !== null && 'details' in error
}

export async function handleDatabaseError(error: unknown): Promise<never> {
  console.error('Database error:', error)

  if (hasDetails(error) && error.code === '23505') {
    throw new ValidationError('This record already exists.', error.details)
  }

  if (hasDetails(error) && error.code === '23503') {
    throw new ValidationError('Referenced record does not exist.', error.details)
  }

  if (hasDetails(error) && error.code?.startsWith('28')) {
    throw new AuthorizationError('You do not have permission to perform this action.')
  }

  if (hasDetails(error) && error.code === '429') {
    throw new DatabaseError('Too many requests. Please try again later.', error.code, error.details, 429)
  }

  if (hasDetails(error) && error.code === '40001') {
    throw new DatabaseError('The operation timed out. Please try again.', error.code, error.details, 408)
  }

  throw new DatabaseError('Unknown error occurred.')
}

// Export a global client instance for use in client components
export const supabase = createClient()

export * from './client'
export * from './server'
export { default as useSupabaseData } from './use-supabase-data'
