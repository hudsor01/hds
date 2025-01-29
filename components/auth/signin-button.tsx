'use client';

import { signIn } from '@/auth';

import { useTransition } from 'react';

interface SignInButtonProps {
  provider?: string;
  redirectTo?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SignInButton({
  provider,
  redirectTo = '/dashboard',
  className,
  children,
}: SignInButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      try {
        await signIn(provider, { redirectTo });
      } catch (error) {
        console.error('Sign in error:', error);
      }
    });
  };

  return (
    <button onClick={handleSignIn} className={className} disabled={isPending}>
      {children || (isPending ? 'Signing in...' : 'Sign in')}
    </button>
  );
}
