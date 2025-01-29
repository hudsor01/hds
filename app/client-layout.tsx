'use client';

import { StrictMode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { AuthProvider } from '@/components/auth/auth-provider';
import { Providers } from '@/components/providers';

import { ThemeMetadata } from './components/theme-metadata';
import theme from './theme';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeMetadata />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>
  );
}
