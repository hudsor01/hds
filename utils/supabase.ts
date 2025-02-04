import {Database} from '@/types/database.types';
import {createClient} from '@supabase/supabase-js';

// Create a custom Supabase client for server components
export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );
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
    },
  );
}
