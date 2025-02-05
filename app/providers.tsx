'use client';

import theme from './theme';
import createEmotionCache from '@/lib/utils/createEmotionCache';
import {CacheProvider} from '@emotion/react';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {useState} from 'react';

const clientSideEmotionCache = createEmotionCache();

export function Providers({children}: {children: React.ReactNode}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={clientSideEmotionCache}>
        <NextThemesProvider attribute='class' defaultTheme='light' enableSystem>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </NextThemesProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
