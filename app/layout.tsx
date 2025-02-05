import './globals.css';
import {Providers} from './providers';
import theme from './theme';
import Navbar from '@/components/layout/Navbar';
import createEmotionCache from '@/lib/utils/createEmotionCache';
import {ClerkProvider} from '@clerk/nextjs';
import {CacheProvider} from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {Analytics} from '@vercel/analytics/react';
import {SpeedInsights} from '@vercel/speed-insights/next';
import {Metadata} from 'next';
import {Roboto} from 'next/font/google';
import Link from 'next/link';
import React from 'react';
import {Toaster} from 'sonner';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const metadata: Metadata = {
  title: 'HDS - Property Management System',
  description: 'Modern property management solution for real estate professionals',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
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
                <div className='relative flex min-h-screen flex-col'>
                  <Navbar />
                  <main className='flex-1'>{children}</main>
                  <footer className='border-t py-6 md:py-0'>
                    <div className='container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row'>
                      <p className='text-sm text-muted-foreground'>
                        © 2024 Hudson Digital Solutions. All rights reserved.
                      </p>
                      <div className='flex items-center space-x-4'>
                        <Link
                          href='/privacy'
                          className='text-sm text-muted-foreground hover:text-foreground'
                        >
                          Privacy
                        </Link>
                        <Link
                          href='/terms'
                          className='text-sm text-muted-foreground hover:text-foreground'
                        >
                          Terms
                        </Link>
                      </div>
                    </div>
                  </footer>
                </div>
                <Toaster position='top-center' expand={true} richColors />
              </Providers>
            </ClerkProvider>
            <Analytics />
          </ThemeProvider>
        </CacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
