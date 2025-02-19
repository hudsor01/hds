'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { LoadingOverlay } from '@/components/shared/LoadingOverlay';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!isLoading && !user) {
      const returnTo = encodeURIComponent(pathname);
      router.push(`/auth/sign-in?returnTo=${returnTo}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return <LoadingOverlay message="Checking authentication..." />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

// HOC (Higher Order Component) to wrap protected components
export function withProtectedRoute<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithProtectedComponent(props: P) {
    return (
      <ProtectedRoute>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}