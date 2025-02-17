import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default async function PrivatePage() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/')
  }

  return <p>Hello {data.user.email}</p>
}
