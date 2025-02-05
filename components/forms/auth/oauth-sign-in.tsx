'use client';

import {Button} from '@/components/ui/buttons/button';

export function OauthSignIn() {
  return (
    <div className='grid gap-2'>
      <Button variant='outline' type='button'>
        <Github className='mr-2 h-4 w-4' />
        Continue with Github
      </Button>
    </div>
  );
}
