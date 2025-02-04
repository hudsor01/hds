'use client';

import {ThemeMetadata} from '../components/theme-metadata';
import {theme} from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {AuthProvider} from 'components/providers/auth-provider';
import {Providers} from 'components/providers/providers';
import {StrictMode} from 'react';

export default function ClientLayout({children}: {children: React.ReactNode}) {
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
