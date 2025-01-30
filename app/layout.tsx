import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Footer } from 'components/layout/footer';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
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
  title: 'Simplify Property Managment - Hub by Hudson Digital Solutions',
  description:
    'Join the waitlist for the most comprehensive property management platform connecting owners, managers, tenants, and service providers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={roboto.className}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
