'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { Loader, Mail } from 'react-feather';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, Divider } from '@mui/material';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const handleChange = e => {
  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    [name]: value,
  }));
};

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        return;
      }

      router.push('/dashboard');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className='w-full space-y-6'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <input
                    type='email'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your email'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <input
                    type='password'
                    className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your password'
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className='text-red-500 text-sm'
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <Button type='submit' className='w-full' disabled={isLoading}>
            {isLoading ? <Loader className='w-4 h-4 mr-2 animate-spin' /> : 'Sign In'}
          </Button>
        </form>
      </Form>

      <div className='relative'>
        <Divider className='my-6'>
          <span className='px-4 text-gray-500'>or</span>
        </Divider>
      </div>

      <Button
        type='button'
        variant='outline'
        className='w-full'
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Mail className='w-4 h-4 mr-2' />
        Sign in with Google
      </Button>
    </div>
  );
}
