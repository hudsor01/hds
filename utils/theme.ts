import { createTheme, type ThemeOptions } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

// Define your Tailwind colors
const tailwindColors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#6B7280',
  secondaryHover: '#4B5563',
  background: '#F9FAFB',
  surface: '#FFFFFF',
  text: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB'
} as const

export const theme = createTheme({
  palette: {
    primary: {
      main: tailwindColors.primary,
      dark: tailwindColors.primaryHover,
      contrastText: '#fff'
    },
    secondary: {
      main: tailwindColors.secondary,
      dark: tailwindColors.secondaryHover,
      contrastText: '#fff'
    },
    background: {
      default: tailwindColors.background,
      paper: tailwindColors.surface
    },
    text: {
      primary: tailwindColors.text,
      secondary: tailwindColors.textSecondary
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: tailwindColors.surface,
          color: tailwindColors.text,
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
        }
      }
    }
  }
} as ThemeOptions)
