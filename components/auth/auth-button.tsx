'use client';

import { useSession } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { signOut } from '../../app/auth/lib/auth/auth';

export function AuthButton() {
  const { session, isLoaded } = useSession();
  const isLoading = status === 'loading';

  if (isLoading) {
    return <Button disabled>Loading...</Button>;
  }

  if (session) {
    return (
      <Button variant='outline' onClick={() => signOut()}>
        Sign Out
      </Button>
    );
  }

  function signIn(arg0: string): void {
    throw new Error('Function not implemented.');
  }

  return <Button onClick={() => signIn('google')}>Sign In with Google</Button>;
}
