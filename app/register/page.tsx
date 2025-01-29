// pages/auth/signup.tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn, useSession } from 'next-auth/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';

import { useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Button, Link, TextField, Typography } from '@mui/material';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  name: yup.string().required('Name is required'),
});

const SignUpPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<{ email: string; password: string; name: string }> = async data => {
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        ...data,
        callbackUrl: '/',
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success('Sign up successful!');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    router.push('/');
    return null;
  }

  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <Box sx={{ width: 400, p: 4, border: '1px solid #ccc', borderRadius: 1 }}>
        <Typography variant='h5' align='center' gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label='Name'
            fullWidth
            margin='normal'
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label='Email'
            fullWidth
            margin='normal'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            margin='normal'
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button type='submit' fullWidth variant='contained' sx={{ mt: 2 }} disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </Button>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant='body2'>
              Already have an account? <Link href='/auth/signin'>Sign In</Link>
            </Typography>
          </Box>

          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button onClick={() => signIn('google')} variant='outlined' fullWidth>
              Sign Up with Google
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default SignUpPage;
