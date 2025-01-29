'use client';

import { signOut } from '@/auth';

import { useTransition } from 'react';

interface SignOutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function SignOutButton({ className, children }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      try {
        await signOut();
      } catch (error) {
        console.error('Sign out error:', error);
      }
    });
  };

  return (
    <button onClick={handleSignOut} className={className} disabled={isPending}>
      {children || (isPending ? 'Signing out...' : 'Sign out')}
    </button>
  );
}
