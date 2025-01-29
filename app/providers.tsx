'use client';

import { ThemeProvider } from 'components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

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
