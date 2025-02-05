'use client';

import theme from './theme';
import createEmotionCache from '@/lib/utils/createEmotionCache';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {ThemeProvider as NextThemesProvider} from 'next-themes';

const clientSideEmotionCache = createEmotionCache();

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
          <CssBaseline />
          {children}
        </NextThemesProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
