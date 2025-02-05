'use client';

import {signIn} from '@/auth';
import {Button} from '@/components/ui/buttons/button';

export default function SignIn() {
  return (
    <form
      action={async () => {
        await signIn('google');
      }}
    >
      <Button type='submit'>Sign in with Google</Button>
    </form>
  );
}
