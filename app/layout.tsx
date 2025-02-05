import './globals.css';
import {Providers} from './providers';
import theme from './theme';
import createEmotionCache from '@/lib/utils/createEmotionCache';
import {ClerkProvider} from '@clerk/nextjs';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import {Toaster} from 'sonner';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const metadata: Metadata = {
  title: 'HDS - Healthcare Data System',
  description: 'Modern healthcare data management system',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  // Use the client-side emotion cache internally
  const emotionCache = clientSideEmotionCache;

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={roboto.className}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ClerkProvider>
              <Providers>
                {children}
                <Toaster position='top-center' expand={true} richColors />
              </Providers>
            </ClerkProvider>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </CacheProvider>
      </body>
    </html>
  );
}
