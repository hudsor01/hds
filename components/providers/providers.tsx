'use client';

import {ClerkProvider} from '@clerk/nextjs';
import {dark} from '@clerk/themes';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: 'bg-pastel-blue-500 hover:bg-pastel-blue-600',
          card: 'bg-background',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'border-border hover:bg-muted',
          dividerLine: 'bg-border',
          formFieldLabel: 'text-foreground',
          formFieldInput: 'bg-input text-foreground',
          footer: 'hidden',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
