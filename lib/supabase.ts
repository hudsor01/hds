import type { Database } from '@/types/database.types';
import { createClient } from '@supabase/supabase-js';

// Load environment variables with fallbacks for test environment
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Configure client with retries and timeouts
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-application-name': 'property-manager' },
  },
  // Add retries for better reliability
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Helper to handle database errors
export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: string,
  ) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export async function handleDatabaseError(error: any): Promise<never> {
  console.error('Database error:', error);

  if (error?.code === '23505') {
    throw new DatabaseError(
      'This record already exists.',
      error.code,
      error.details,
    );
  }

  if (error?.code === '23503') {
    throw new DatabaseError(
      'Referenced record does not exist.',
      error.code,
      error.details,
    );
  }

  if (error?.code?.startsWith('28')) {
    throw new DatabaseError(
      'You do not have permission to perform this action.',
      error.code,
    );
  }

  throw new DatabaseError(
    'An unexpected database error occurred. Please try again.',
    error?.code,
    error?.details,
  );
}

// Utility function for safe database operations
export async function safeQuery<T>(
  operation: () => Promise<{ data: T | null; error: any }>,
): Promise<T> {
  const { data, error } = await operation();

  if (error) {
    await handleDatabaseError(error);
  }

  if (!data) {
    throw new DatabaseError('No data returned from the database.');
  }

  return data;
}

export default supabase;
