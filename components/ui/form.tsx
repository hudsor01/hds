'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Button, CircularProgress, FormHelperText, TextField } from '@mui/material';

export function SimpleForm() {
  const { control, handleSubmit } = useForm();
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(handleSubmit, null);

  return (
    <FormProvider control={control}>
      <form action={formAction}>
        <div className='space-y-4 mb-6'>
          <Controller
            name='email'
            control={control}
            rules={{ required: 'Email is required' }}
            render={({ field, fieldState }) => (
              <div>
                <TextField
                  {...field}
                  label='Email'
                  fullWidth
                  error={!!fieldState.error}
                  disabled={pending}
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
            rules={{ required: 'Password is required', minLength: 8 }}
            render={({ field, fieldState }) => (
              <div>
                <TextField
                  {...field}
                  label='Password'
                  type='password'
                  fullWidth
                  error={!!fieldState.error}
                  disabled={pending}
                />
                {fieldState.error && (
                  <FormHelperText error>
                    {fieldState.error.type === 'minLength'
                      ? 'Password must be at least 8 characters'
                      : fieldState.error.message}
                  </FormHelperText>
                )}
              </div>
            )}
          />
        </div>

        <Button
          type='submit'
          variant='contained'
          disabled={pending}
          endIcon={pending && <CircularProgress size={20} />}
        >
          {pending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
}
