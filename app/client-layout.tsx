'use client';

import { StrictMode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { Providers } from '@/components/providers';
import { AuthProvider } from '@/components/providers/auth-provider';

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
