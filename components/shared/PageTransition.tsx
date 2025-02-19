'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { LoadingOverlay } from './LoadingOverlay';
import { useGlobal } from '@/contexts/GlobalContext';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setGlobalLoading, globalLoading } = useGlobal();

  useEffect(() => {
    setGlobalLoading(true);
    const timer = setTimeout(() => {
      setGlobalLoading(false);
    }, 500); // Add a small delay to avoid flickering for fast loads

    return () => {
      clearTimeout(timer);
      setGlobalLoading(false);
    };
  }, [pathname, searchParams, setGlobalLoading]);

  return (
    <>
      {globalLoading && <LoadingOverlay />}
      {children}
    </>
  );
}