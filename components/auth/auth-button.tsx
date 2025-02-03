'use client';

import {signOut} from '../../app/auth/lib/auth/auth';
import {Button} from '@/components/ui/button';
import {useSession} from '@clerk/nextjs';

export function AuthButton() {
  const {session, isLoaded} = useSession();
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
