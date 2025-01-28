import { Roboto } from 'next/font/google';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { Footer } from '@/components/layout/footer';

import { Navbar } from './components/layout/navbar';
import './globals.css';
import { ThemeProvider } from './theme-provider';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
  preload: true,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
