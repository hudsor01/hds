'use client';

import { FormInput } from '@/components/forms/form-fields';
import { FormContainer } from '@/components/forms/form-provider';
import { signInSchema } from '@/lib/validations/schemas';

import { Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

type SignInFormData = z.infer<typeof signInSchema>;

export function LoginForm() {
  const { signIn } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: SignInFormData) => {
    if (!signIn) return;

    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === 'complete') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error('Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer schema={signInSchema} onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormInput
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          disabled={isLoading}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Stack>
    </FormContainer>
  );
}
