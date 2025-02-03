'use client';

import {SignIn} from '@clerk/nextjs';

export function LoginForm() {
  return (
    <SignIn
      appearance={{
        elements: {
          rootBox: 'w-full',
          card: 'w-full max-w-md mx-auto shadow-lg rounded-lg bg-background',
          headerTitle: 'text-2xl font-bold text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'hover:bg-muted',
          formButtonPrimary:
            'bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200',
          formFieldInput: 'bg-background border border-input',
          footerAction: 'text-primary hover:text-primary/90',
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground bg-background px-2',
          otpCodeFieldInput: 'bg-background border border-input text-foreground',
          alertText: 'text-destructive',
          socialButtonsIconButton: 'hover:bg-muted transition-colors',
          socialButtonsProviderIcon: 'w-5 h-5',
          formFieldLabelRow: 'text-foreground',
          identityPreviewText: 'text-muted-foreground',
        },
        variables: {
          colorPrimary: 'hsl(var(--primary))',
          colorBackground: 'hsl(var(--background))',
          colorText: 'hsl(var(--foreground))',
          colorInputBackground: 'hsl(var(--background))',
          colorInputText: 'hsl(var(--foreground))',
          fontFamily: 'var(--font-sans)',
          borderRadius: 'var(--radius)',
        },
      }}
      routing='path'
      path='/sign-in'
      signUpUrl='/sign-up'
      fallbackRedirectUrl='/dashboard'
      forceRedirectUrl='/dashboard'
      afterSignInUrl='/dashboard'
    />
  );
}
