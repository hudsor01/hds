'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>
        <ThemeProvider>
          {children}
          <Toaster position='top-right' />
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
