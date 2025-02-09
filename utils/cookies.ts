import { cookies } from 'next/headers'

export function createCookieOptions() {
  return {
    async get(name: string) {
      try {
        const cookieStore = await cookies()
        const cookie = cookieStore.get(name)
        return cookie?.value
      } catch {
        return undefined
      }
    },
    async set(name: string, value: string, options: { path: string }) {
      try {
        const cookieStore = await cookies()
        cookieStore.set({
          name,
          value,
          ...options,
        })
      } catch {
        // Safely ignore cookie errors in Server Components
      }
    },
    async remove(name: string, options: { path: string }) {
      try {
        const cookieStore = await cookies()
        cookieStore.set({
          name,
          value: '',
          ...options,
          maxAge: 0,
        })
      } catch {
        // Safely ignore cookie errors in Server Components
      }
    },
  }
}
