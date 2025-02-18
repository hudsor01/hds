import { Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { theme } from '@/lib/theme';
import Navbar from '@/components/layouts/Navbar';

// Fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/playfair-display';

// Global styles
import './globals.css';

export const metadata = {
  title: 'HDS - Property Management System',
  description: 'Modern property management system for real estate professionals',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            
            {/* Main Navigation */}
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
            </Suspense>

            {/* Main Content */}
            <main>
              {children}
            </main>

            {/* Analytics */}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
