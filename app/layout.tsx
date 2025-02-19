'use client';

import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/theme';
import { StoreProvider } from '@/components/providers/StoreProvider';
import { LoadingOverlay } from '@/components/shared/LoadingOverlay';
import { Notifications } from '@/components/shared/Notifications';

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/playfair-display';

// Global styles
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Suspense fallback={<LoadingOverlay />}>
              {children}
              <Notifications />
            </Suspense>
          </ThemeProvider>
        </StoreProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}