import { cookies } from 'next/headers';

export function createCookieOptions() {
  return {
    get(name: string) {
      try {
        const cookieStore = cookies();
        const cookie = cookieStore.get(name);
        return cookie?.value;
      } catch {
        return undefined;
      }
    },
    set(name: string, value: string, options: { path: string }) {
      try {
        const cookieStore = cookies();
        cookieStore.set({
          name,
          value,
          ...options,
        });
      } catch {
        // Safely ignore cookie errors in Server Components
      }
    },
    remove(name: string, options: { path: string }) {
      try {
        const cookieStore = cookies();
        cookieStore.set({
          name,
          value: '',
          ...options,
          maxAge: 0,
        });
      } catch {
        // Safely ignore cookie errors in Server Components
      }
    },
  };
}
