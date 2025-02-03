import './globals.css';
import {Providers} from './providers';
import {ClerkProvider} from '@clerk/nextjs';
import {dark} from '@clerk/themes';
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Property Management System',
  description: 'Modern property management system for landlords and tenants',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90',
          footerActionLink: 'text-primary hover:text-primary/90',
          card: 'bg-background shadow-lg',
        },
        variables: {
          colorPrimary: 'rgb(var(--primary))',
          colorTextOnPrimaryBackground: 'rgb(var(--primary-foreground))',
        },
      }}
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang='en' suppressHydrationWarning>
        <body className={roboto.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
