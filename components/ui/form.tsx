'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {Box, Button, FormHelperText, TextField, Paper} from '@mui/material';
import {memo} from 'react';
import {useFormState, useFormStatus} from 'react-dom';
import {Loader} from 'react-feather';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';

// Form Schemas
const loginFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerFormSchema = loginFormSchema
  .extend({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const resetPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

// Types
type LoginFormValues = z.infer<typeof loginFormSchema>;
type RegisterFormValues = z.infer<typeof registerFormSchema>;
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

// Form Field Component (Memoized for performance)
const FormField = memo(
  ({
    control,
    name,
    label,
    type = 'text',
    pending,
  }: {
    control: any;
    name: string;
    label: string;
    type?: string;
    pending: boolean;
  }) => (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => (
        <div>
          <TextField
            {...field}
            label={label}
            type={type}
            fullWidth
            error={!!fieldState.error}
            disabled={pending}
            sx={{mb: 1}}
          />
          {fieldState.error && <FormHelperText error>{fieldState.error.message}</FormHelperText>}
        </div>
      )}
    />
  ),
);
FormField.displayName = 'FormField';

// Server actions
async function loginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // Handle login logic here
    return {message: 'Success'};
  } catch (error) {
    return {error: 'Login failed'};
  }
}

async function registerAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    // Handle registration logic here
    return {message: 'Success'};
  } catch (error) {
    return {error: 'Registration failed'};
  }
}

async function resetPasswordAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    // Handle password reset logic here
    return {message: 'Success'};
  } catch (error) {
    return {error: 'Password reset failed'};
  }
}

// Form Components
export const LoginForm = memo(() => {
  const {control} = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {email: '', password: ''},
  });

  const {pending} = useFormStatus();
  const [state, dispatch] = useFormState(loginAction, null);

  return (
    <Paper elevation={3} className='p-6'>
      <Box component='form' action={dispatch} className='max-w-md mx-auto space-y-4'>
        <FormField control={control} name='email' label='Email' type='email' pending={pending} />
        <FormField
          control={control}
          name='password'
          label='Password'
          type='password'
          pending={pending}
        />

        {state?.error && (
          <FormHelperText error className='mb-4'>
            {state.error}
          </FormHelperText>
        )}

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={pending}
          startIcon={pending && <Loader className='animate-spin h-4 w-4' />}
        >
          {pending ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </Paper>
  );
});
LoginForm.displayName = 'LoginForm';

export const RegisterForm = memo(() => {
  const {control} = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {name: '', email: '', password: '', confirmPassword: ''},
  });

  const {pending} = useFormStatus();
  const [state, dispatch] = useFormState(registerAction, null);

  return (
    <Paper elevation={3} className='p-6'>
      <Box component='form' action={dispatch} className='max-w-md mx-auto space-y-4'>
        <FormField control={control} name='name' label='Full Name' pending={pending} />
        <FormField control={control} name='email' label='Email' type='email' pending={pending} />
        <FormField
          control={control}
          name='password'
          label='Password'
          type='password'
          pending={pending}
        />
        <FormField
          control={control}
          name='confirmPassword'
          label='Confirm Password'
          type='password'
          pending={pending}
        />

        {state?.error && (
          <FormHelperText error className='mb-4'>
            {state.error}
          </FormHelperText>
        )}

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={pending}
          startIcon={pending && <Loader className='animate-spin h-4 w-4' />}
        >
          {pending ? 'Creating account...' : 'Create Account'}
        </Button>
      </Box>
    </Paper>
  );
});
RegisterForm.displayName = 'RegisterForm';

export const ResetPasswordForm = memo(() => {
  const {control} = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {email: ''},
  });

  const {pending} = useFormStatus();
  const [state, dispatch] = useFormState(resetPasswordAction, null);

  return (
    <Paper elevation={3} className='p-6'>
      <Box component='form' action={dispatch} className='max-w-md mx-auto space-y-4'>
        <FormField control={control} name='email' label='Email' type='email' pending={pending} />

        {state?.error && (
          <FormHelperText error className='mb-4'>
            {state.error}
          </FormHelperText>
        )}

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={pending}
          startIcon={pending && <Loader className='animate-spin h-4 w-4' />}
        >
          {pending ? 'Sending...' : 'Reset Password'}
        </Button>
      </Box>
    </Paper>
  );
});
ResetPasswordForm.displayName = 'ResetPasswordForm';
