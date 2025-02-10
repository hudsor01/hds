import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';
import { Providers } from '@/components/providers/providers';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Configure Roboto font with variable fonts
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Property Manager',
  description: 'Manage your properties efficiently',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Next.js automatically adds viewport meta - remove manual declaration */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={roboto.className}>
        <Providers>
          <AuthProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-140px)]">{children}</main>
            <Footer />
            <Toaster position="top-center" expand richColors />
          </AuthProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
