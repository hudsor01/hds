'use client';

import { Box, Container, Paper, Typography } from '@mui/material';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createBrowserClient } from '@supabase/ssr';

export default function SignInPage() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return (
    <Container
      maxWidth="sm"
      className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
    >
      <Paper elevation={3} className="hover-card w-full space-y-8 p-8">
        <Box className="text-center">
          <Typography
            variant="h4"
            component="h1"
            className="gradient-text font-bold"
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" className="mt-2 text-muted-foreground">
            Sign in to your account to continue
          </Typography>
        </Box>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#007FFF',
                  brandAccent: '#0059B2',
                },
              },
            },
            className: {
              container: 'w-full',
              button: 'w-full rounded-md',
              input: 'rounded-md bg-background border-input',
            },
          }}
          providers={['google', 'github']}
          redirectTo={`${window.location.origin}/auth/callback`}
          theme="light"
          showLinks={true}
          view="sign_in"
        />
      </Paper>
    </Container>
  );
}
