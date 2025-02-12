import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function ServerAuth() {
  const supabase = createClient()

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error) {
      console.error('Auth error:', error.message)
      redirect('/sign-in')
    }

    if (!user) {
      redirect('/sign-in')
    }

    return user
  } catch (error) {
    console.error('Unexpected auth error:', error)
    redirect('/sign-in')
  }
}
