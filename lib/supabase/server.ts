import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map(cookie => ({ name: cookie.name, value: cookie.value }))
      },
      setAll(cookies: { name: string; value: string }[]) {
        cookies.forEach(cookie => {
          cookieStore.set(cookie)
        })
      }
    }
  })
}
