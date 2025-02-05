import ClientLayout from './client-layout';
import './globals.css';
import type {Metadata} from 'next';
import {Roboto} from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Property Manager',
  description: 'Modern property management solution',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={roboto.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
