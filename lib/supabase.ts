import type { Database } from '@/types/db.types'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const createClient = (): ReturnType<typeof createServerClient> => {
  try {
    const cookieStore = cookies()
    return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
      cookies: {
        async getAll() {
          const parsed = (await cookieStore).getAll().map(cookie => {
            return { name: cookie.name, value: cookie.value }
          })
          return parsed
        },
        async setAll(newCookies) {
          const resolvedCookieStore = await cookieStore
          newCookies.forEach(cookie => {
            resolvedCookieStore.set(cookie.name, cookie.value)
          })
        }
      }
    })
  } catch {
    return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
  }
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

function hasDetails(error: unknown): error is { details: string; code?: string } {
  return typeof error === 'object' && error !== null && 'details' in error
}

export async function handleDatabaseError(error: unknown): Promise<never> {
  console.log('Error object:', error)
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

  throw new Error('Unknown error occurred.')
}

export default createClient
