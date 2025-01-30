'use client';

import { ThemeProvider } from 'components/theme-provider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
