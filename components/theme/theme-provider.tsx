'use client';

import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider as MUIThemeProvider} from '@mui/material/styles';
import {createTheme} from '@mui/material/styles';

const theme = createTheme({
  // your theme configuration
});

export function ThemeProvider({children}: {children: React.ReactNode}) {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
