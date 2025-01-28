'use client';

import { signIn } from 'next-auth/react';

import { useState } from 'react';

import { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';

import { authenticate } from '../lib/actions';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = (searchParams.get('callbackUrl') || '/dashboard') as Route;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('email', formData.email);
      formDataObj.append('password', formData.password);

      const result = await authenticate(undefined, formDataObj);

      if (typeof result === 'string') {
        setError(result);
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && <div className='bg-red-50 text-red-500 p-4 rounded-md text-sm'>{error}</div>}

      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
          Email
        </label>
        <input
          id='email'
          type='email'
          required
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-xs focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500'
        />
      </div>

      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <input
          id='password'
          type='password'
          required
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-xs focus:border-blue-500 focus:outline-hidden focus:ring-1 focus:ring-blue-500'
        />
      </div>

      <button
        type='submit'
        disabled={isLoading}
        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-xs text-sm font-medium text-primary-foreground bg-primary hover:opacity-90 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary animate-scale-in tap-scale transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      <div className='relative my-6 animate-fade-in'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-border' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='px-2 bg-background text-muted-foreground'>Or continue with</span>
        </div>
      </div>

      <button
        type='button'
        onClick={() => signIn('google', { callbackUrl })}
        className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-md shadow-xs text-sm font-medium text-foreground bg-background hover:bg-muted/50 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary animate-scale-in tap-scale transition-all duration-200'
      >
        <svg className='h-5 w-5' viewBox='0 0 24 24'>
          <path
            d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            fill='#4285F4'
          />
          <path
            d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            fill='#34A853'
          />
          <path
            d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
            fill='#FBBC05'
          />
          <path
            d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
            fill='#EA4335'
          />
        </svg>
        Google
      </button>

      <p className='mt-4 text-center text-sm text-muted-foreground animate-fade-in'>
        Don't have an account?{' '}
        <a
          href='/auth/register'
          className='font-medium text-primary hover:opacity-90 transition-opacity'
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
