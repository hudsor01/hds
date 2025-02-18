import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        try {
          const getAllFn = cookieStore.getAll as () => any[]
          const cookiesArray =
            typeof getAllFn === 'function'
              ? (getAllFn() as ReadonlyArray<{ name: string; value: string }> | undefined)
              : undefined
          return Array.isArray(cookiesArray) && cookiesArray.length > 0
            ? cookiesArray.map((cookie: { name: string; value: string }) => ({ name: cookie.name, value: cookie.value }))
            : []
        } catch (e) {
          console.error('Failed to getAll cookies', e)
          return []
        }
      },
      setAll(newCookies: { name: string; value: string }[]) {
        newCookies.forEach(cookie => {
          try {
            ;(cookieStore.set as (name: string, value: string) => void)(cookie.name, cookie.value)
          } catch (e) {
            console.error(`Failed to set cookie ${cookie.name}=${cookie.value}`, e)
          }
        })
      }
    }
  })
}
