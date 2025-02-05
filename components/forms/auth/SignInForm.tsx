'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {
  Google as GoogleIcon,
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {LoadingButton} from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {z} from 'zod';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export const SignInForm = ({
  onSubmitAction,
  onGoogleSignInAction,
  onForgotPasswordAction,
  onSignUpAction,
}: {
  onSubmitAction: (data: SignInFormValues) => Promise<void>;
  onGoogleSignInAction: () => Promise<void>;
  onForgotPasswordAction: () => void;
  onSignUpAction: () => void;
}) => {
  const [error, setError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const handleFormSubmit = async (data: SignInFormValues) => {
    try {
      setError(null);
      await onSubmitAction(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(show => !show);
  };

  return (
    <Paper elevation={3} sx={{p: 4, maxWidth: 400, mx: 'auto'}}>
      <Typography variant='h5' gutterBottom align='center'>
        Sign In
      </Typography>

      <Button
        fullWidth
        variant='outlined'
        startIcon={<GoogleIcon />}
        onClick={onGoogleSignInAction}
        sx={{mb: 3}}
      >
        Sign in with Google
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
              autoFocus
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
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={togglePasswordVisibility}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Box sx={{textAlign: 'right', mt: 1}}>
          <Link
            component='button'
            variant='body2'
            onClick={onForgotPasswordAction}
            sx={{cursor: 'pointer'}}
          >
            Forgot password?
          </Link>
        </Box>

        <LoadingButton
          type='submit'
          fullWidth
          variant='contained'
          loading={isSubmitting}
          loadingPosition='start'
          startIcon={<LoginIcon />}
          sx={{mt: 3}}
        >
          Sign In
        </LoadingButton>

        <Box sx={{mt: 2, textAlign: 'center'}}>
          <Typography variant='body2'>
            Don't have an account?{' '}
            <Link
              component='button'
              variant='body2'
              onClick={onSignUpAction}
              sx={{cursor: 'pointer'}}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
