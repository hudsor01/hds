import { createBrowserClient } from '@supabase/ssr'
import { useState } from 'react'

export const useWaitlist = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const addToWaitlist = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error: dbError } = await supabase.from('waitlist').insert([{ email, joined_at: new Date().toISOString() }])
      if (dbError) throw dbError
      return { success: true }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      return { success: false, error }
    } finally {
      setLoading(false)
    }
  }

  return { addToWaitlist, loading, error }
}
