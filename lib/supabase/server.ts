import {Database} from '@/types/database.types';
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';

export function createServerSupabaseClient() {
  return createRouteHandlerClient<Database>({cookies});
}
