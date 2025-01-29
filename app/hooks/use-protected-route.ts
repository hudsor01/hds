'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { createBrowserClient } from '@supabase/ssr';

export function useProtectedRoute() {
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        router.push('/login');
      }
    };

    void checkAuth();
  }, [router, supabase.auth]);
}
