import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getCurrentUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return <p>Hello {data.user.email}</p>;
}
