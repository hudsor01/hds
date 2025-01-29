'use client';

import { Button } from 'components/ui/button';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='min-h-[400px] flex flex-col items-center justify-center p-4'>
      <h2 className='text-2xl font-bold mb-4'>Something went wrong</h2>
      <p className='text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md'>
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <Button onClick={reset} variant='outline'>
        Try again
      </Button>
    </div>
  );
}
