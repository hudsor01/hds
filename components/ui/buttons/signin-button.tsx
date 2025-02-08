'use client';

import { Button } from '@mui/material';

export function SignInButton() {
  const { signIn } = useSignIn();

  return (
    <Button
      variant="contained"
      onClick={() => {
        if (!signIn) {
          console.error('signIn is undefined');
          return;
        }
        signIn.create({
          strategy: 'email_link',
          identifier: 'user@example.com',
          redirectUrl: '/dashboard',
        });
      }}
    >
      Sign In
    </Button>
  );
}
