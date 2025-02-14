// lib/supabase.ts
import type { Database } from '@/types/db.types'
import { SupabaseClient } from '@supabase/supabase-js'
import supabase from '@/utils/supabase/client'

const supabaseClient: SupabaseClient<Database> = supabase

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
    throw new DatabaseError(
      'Too many requests. Please try again later.',
      error.code,
      error.details,
      429
    )
  }

  if (hasDetails(error) && error.code === '40001') {
    throw new DatabaseError(
      'The operation timed out. Please try again.',
      error.code,
      error.details,
      408
    )
  }

  const errorDetails = hasDetails(error) ? error.details : undefined
  throw new DatabaseError(
    'An unexpected database error occurred. Please try again.',
    typeof error === 'object' && error !== null ? (error as any).code : undefined,
    errorDetails,
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
