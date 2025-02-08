'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'sonner';
import Navbar from '../components/layout/Navbar';
import { Providers } from './providers';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Providers>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2024 Hudson Digital Solutions. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <a
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Privacy
                </a>
                <a
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Terms
                </a>
              </div>
            </div>
          </footer>
        </div>
        <Toaster position="top-center" expand={true} richColors />
      </Providers>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
