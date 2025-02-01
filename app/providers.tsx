'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#0ea5e9',
          colorTextOnPrimaryBackground: 'white',
          borderRadius: '0.5rem',
        },
        elements: {
          formButtonPrimary:
            'bg-sky-500 hover:bg-sky-600 text-white transition-colors',
          card:
            'bg-white dark:bg-slate-800 shadow-lg',
          headerTitle:
            'text-slate-900 dark:text-white text-2xl font-bold',
          headerSubtitle:
            'text-slate-600 dark:text-slate-300',
          socialButtonsBlockButton:
            'border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700',
          formFieldInput:
            'rounded-md border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900',
          footerActionLink:
            'text-sky-500 hover:text-sky-600',
          dividerLine:
            'bg-slate-200 dark:bg-slate-700',
          dividerText:
            'text-slate-500 dark:text-slate-400'
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
    </ClerkProvider>
  );
}
