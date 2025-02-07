import {Database} from '@/types/database.types';
import {auth} from '@clerk/nextjs/server';
import {createClient} from '@supabase/supabase-js';

export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
  );
}

export async function createClerkSupabaseClient() {
  const {userId} = await auth();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      global: {
        headers: {
          'x-clerk-user-id': userId || '',
        },
      },
    },
  );
}
