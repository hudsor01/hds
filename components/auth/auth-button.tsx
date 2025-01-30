'use client';

import { useSession } from '@clerk/nextjs';
import { Button } from 'components/ui/button';
import { signIn, signOut } from '../../app/auth/lib';

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

  return <Button onClick={() => signIn('google')}>Sign In with Google</Button>;
}
