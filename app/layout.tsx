import { Footer } from 'components/layout/footer';
import { Navbar } from 'components/layout/navbar';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  fallback: ['system-ui', 'inter'],
  preload: true,
});

export const metadata: Metadata = {
  title: 'PropTech Hub - The Future of Property Management',
  description:
    'Join the waitlist for the most comprehensive property management platform connecting owners, managers, tenants, and service providers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${roboto.variable} antialiased`}>
      <body className='min-h-screen bg-background font-sans antialiased'>
        <Providers>
          <Navbar />
          <main className='relative flex min-h-screen flex-col'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
