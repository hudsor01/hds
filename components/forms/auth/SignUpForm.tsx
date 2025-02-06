'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Google as GoogleIcon, PersonAdd as PersonAddIcon} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';

const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  onSubmit: (data: SignUpFormValues) => Promise<void>;
  onGoogleSignUp: () => Promise<void>;
  onSignIn: () => void;
}

export const SignUpForm = ({onSubmit, onGoogleSignUp, onSignIn}: SignUpFormProps) => {
  const [error, setError] = React.useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const handleFormSubmit = async (data: SignUpFormValues) => {
    try {
      setError(null);
      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <Paper elevation={3} sx={{p: 4, maxWidth: 400, mx: 'auto'}}>
      <Typography variant='h5' gutterBottom align='center'>
        Create an Account
      </Typography>

      <Button
        fullWidth
        variant='outlined'
        startIcon={<GoogleIcon />}
        onClick={onGoogleSignUp}
        sx={{mb: 3}}
      >
        Sign up with Google
      </Button>

      <Divider sx={{my: 2}}>or</Divider>

      <Collapse in={!!error}>
        {error && (
          <Alert severity='error' sx={{mb: 2}}>
            {error}
          </Alert>
        )}
      </Collapse>

      <Box component='form' onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Box sx={{display: 'flex', gap: 2}}>
          <Controller
            name='firstName'
            control={control}
            defaultValue=''
            render={({field}) => (
              <TextField
                {...field}
                margin='normal'
                required
                fullWidth
                label='First Name'
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            )}
          />

          <Controller
            name='lastName'
            control={control}
            defaultValue=''
            render={({field}) => (
              <TextField
                {...field}
                margin='normal'
                required
                fullWidth
                label='Last Name'
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            )}
          />
        </Box>

        <Controller
          name='email'
          control={control}
          defaultValue=''
          render={({field}) => (
            <TextField
              {...field}
              margin='normal'
              required
              fullWidth
              label='Email Address'
              autoComplete='email'
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Controller
          name='password'
          control={control}
          defaultValue=''
          render={({field}) => (
            <TextField
              {...field}
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <LoadingButton
          type='submit'
          fullWidth
          variant='contained'
          loading={isSubmitting}
          loadingPosition='start'
          startIcon={<PersonAddIcon />}
          sx={{mt: 3}}
        >
          Sign Up
        </LoadingButton>

        <Box sx={{mt: 2, textAlign: 'center'}}>
          <Typography variant='body2'>
            Already have an account?{' '}
            <Link component='button' variant='body2' onClick={onSignIn} sx={{cursor: 'pointer'}}>
              Sign in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
