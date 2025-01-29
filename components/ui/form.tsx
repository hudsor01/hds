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

export function SimpleForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { pending } = useFormStatus();

  const handleFormSubmit = async (data: FormValues) => {
    // Handle form submission here
    try {
      console.log('Form data:', data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const [state, formAction] = useFormState(handleSubmit(handleFormSubmit), null);

  return (
    <Box component='form' action={formAction} className='max-w-md mx-auto'>
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
