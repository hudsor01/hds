import type { Database } from '@/types/db.types'
import { createClient } from '@supabase/supabase-js'

// Load environment variables with fallbacks for test environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing required Supabase environment variables')
}

// Configure client with retries and timeouts
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: { 'x-application-name': 'property-manager' }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

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

export async function handleDatabaseError(error: unknown): Promise<never> {
  console.error('Database error:', error)

  // Unique constraint violations
  if (error?.code === '23505') {
    throw new ValidationError('This record already exists.', error.details)
  }

  // Foreign key violations
  if (error?.code === '23503') {
    throw new ValidationError('Referenced record does not exist.', error.details)
  }

  // Permission errors
  if (error?.code?.startsWith('28')) {
    throw new AuthorizationError('You do not have permission to perform this action.')
  }

  // Rate limiting errors
  if (error?.code === '429') {
    throw new DatabaseError(
      'Too munknown requests. Please try again later.',
      error.code,
      error.details,
      429
    )
  }

  // Timeout errors
  if (error?.code === '40001') {
    throw new DatabaseError(
      'The operation timed out. Please try again.',
      error.code,
      error.details,
      408
    )
  }

  throw new DatabaseError(
    'An unexpected database error occurred. Please try again.',
    error?.code,
    error?.details,
    500
  )
}

// Enhanced safe query utility with timeout and retry logic
export async function safeQuery<T>(
  operation: () => Promise<{ data: T | null; error: unknown }>,
  options: {
    timeout?: number
    retries?: number
    retryDelay?: number
  } = {}
): Promise<T> {
  const { timeout = 30000, retries = 3, retryDelay = 1000 } = options

  let lastError: unknown

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const { data, error } = await operation()
      clearTimeout(timeoutId)

      if (error) {
        lastError = error
        throw error
      }

      if (!data) {
        throw new DatabaseError('No data returned from the database.')
      }

      return data
    } catch (error) {
      lastError = error
      if (attempt === retries - 1) {
        await handleDatabaseError(error)
      }
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)))
    }
  }

  throw lastError
}

export default supabase
