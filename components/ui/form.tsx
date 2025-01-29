'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState, useFormStatus } from 'react-dom';
import { Loader } from 'react-feather';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

import { Box, Button, FormHelperText, TextField } from '@mui/material';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormValues = z.infer<typeof formSchema>;

// Server action
async function formAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // Handle your form submission logic here
    console.log({ email, password });
    return { message: 'Success' };
  } catch (error) {
    return { error: 'Failed to submit' };
  }
}

export function SimpleForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { pending } = useFormStatus();
  const [state, dispatch] = useFormState(formAction, null);

  return (
    <Box component='form' action={dispatch} className='max-w-md mx-auto'>
      <div className='space-y-4 mb-6'>
        <Controller
          name='email'
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextField
                {...field}
                label='Email'
                type='email'
                fullWidth
                error={!!fieldState.error}
                disabled={pending}
                sx={{ mb: 1 }}
              />
              {fieldState.error && (
                <FormHelperText error>{fieldState.error.message}</FormHelperText>
              )}
            </div>
          )}
        />

        <Controller
          name='password'
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <TextField
                {...field}
                label='Password'
                type='password'
                fullWidth
                error={!!fieldState.error}
                disabled={pending}
                sx={{ mb: 1 }}
              />
              {fieldState.error && (
                <FormHelperText error>{fieldState.error.message}</FormHelperText>
              )}
            </div>
          )}
        />
      </div>

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
        {pending ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
}
