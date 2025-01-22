'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#E3F2FD',
      main: '#2563eb',
      dark: '#1e40af',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#F3E5F5',
      main: '#9333ea',
      dark: '#6b21a8',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: 'var(--font-roboto), system-ui, sans-serif',
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
})

export default theme
