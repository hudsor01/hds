'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { Separator } from 'components/ui/separator';
import { AnimatePresence, motion } from 'framer-motion';
import { useFormStatus } from 'react-dom';
import { Loader } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useActionState, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, FormControl } from '@mui/material';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { signIn } from '../../app/auth/lib';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
} | null;

async function authenticate(prevState: FormState, formData: FormData) {
  try {
    const validatedFields = loginSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Invalid form data',
      };
    }

    const result = await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });

    if (result?.error) {
      return {
        message: 'Invalid email or password',
      };
    }

    return null;
  } catch (error) {
    return {
      message: 'An error occurred. Please try again.',
    };
  }
}

export function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(authenticate, null);
  const { pending } = useFormStatus();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        form.setError('root', { message: 'Invalid email or password' });
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      form.setError('root', { message: 'An error occurred. Please try again.' });
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto shadow-lg animate-fade-in'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl font-bold'>Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <Box component='form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormControl fullWidth>
            <Controller
              control={form.control}
              name='email'
              render={({ field, fieldState }) => (
                <div>
                  <Label>Email</Label>
                  <Input
                    type='email'
                    placeholder='name@example.com'
                    disabled={pending}
                    className='transition-all duration-200'
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                </div>
              )}
            />
          </FormControl>

          {/* Similar changes for password field */}
          <FormControl fullWidth>
            <Controller
              control={form.control}
              name='password'
              render={({ field, fieldState }) => (
                <div>
                  <Label>Password</Label>
                  <Input
                    type='password'
                    placeholder='Enter your password'
                    disabled={pending}
                    className='transition-all duration-200'
                    aria-invalid={!!fieldState.error}
                    {...field}
                  />
                </div>
              )}
            />
          </FormControl>
          <AnimatePresence>
            {state?.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='p-3 text-sm text-red-500 bg-red-50 rounded-md'
              >
                {state.message}
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            type='submit'
            className='w-full transition-all duration-200 hover:opacity-90'
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader className='w-4 h-4 mr-2 animate-spin' />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <Separator className='w-full' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
            </div>
          </div>
          <Button
            type='button'
            variant='outline'
            className='w-full h-10 flex items-center justify-center gap-3 px-4 py-0 border border-input hover:bg-accent hover:text-accent-foreground transition-all duration-200'
            onClick={handleGoogleSignIn}
            disabled={pending || isGoogleLoading}
          >
            {isGoogleLoading ? (
              <Loader className='h-4 w-4 animate-spin' />
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 48 48'
                className='h-4 w-4'
                aria-hidden='true'
              >
                <path
                  fill='#EA4335'
                  d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
                />
                <path
                  fill='#4285F4'
                  d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'
                />
                <path
                  fill='#FBBC05'
                  d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'
                />
                <path
                  fill='#34A853'
                  d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
                />
              </svg>
            )}
            <span className='text-sm font-medium tracking-wide'>Sign in with Google</span>
          </Button>
          <p className='text-center text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <a
              href='/auth/register'
              className='font-medium text-primary hover:opacity-90 transition-opacity'
            >
              Sign up
            </a>
          </p>
        </Box>
      </CardContent>
    </Card>
  );
}
