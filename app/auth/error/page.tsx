'use client';

import {Button} from 'components/ui/button';
import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-4 text-center'>
        <h1 className='text-2xl font-bold tracking-tight'>Authentication Error</h1>
        <p className='text-muted-foreground'>
          There was a problem authenticating your account. Please try again.
        </p>
        <Link href='/' passHref>
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
