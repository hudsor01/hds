'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';

export function useProtectedRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAppSelector(state => state.auth);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const returnTo = encodeURIComponent(pathname);
      router.push(`/auth/sign-in?returnTo=${returnTo}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  return {
    isLoading,
    isAuthenticated,
    user,
  };
}