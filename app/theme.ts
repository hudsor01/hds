'use client'

import { alpha, createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

// Custom shadow generator
const createCustomShadow = (color: string) => {
  const transparent = alpha(color, 0.16)
  return {
    z1: `0 1px 2px 0 ${transparent}`,
    z8: `0 8px 16px 0 ${transparent}`,
    z12: `0 12px 24px -4px ${transparent}`,
    z16: `0 16px 32px -4px ${transparent}`,
    z20: `0 20px 40px -4px ${transparent}`,
    z24: `0 24px 48px 0 ${transparent}`,
    primary: `0 8px 16px 0 ${alpha(color, 0.24)}`,
    info: `0 8px 16px 0 ${alpha(color, 0.24)}`,
    secondary: `0 8px 16px 0 ${alpha(color, 0.24)}`,
    success: `0 8px 16px 0 ${alpha(color, 0.24)}`,
    warning: `0 8px 16px 0 ${alpha(color, 0.24)}`,
    error: `0 8px 16px 0 ${alpha(color, 0.24)}`,
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    grey: {
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    divider: '#E5E7EB',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0px 2px 4px -1px rgba(0,0,0,0.06)',
    '0px 4px 6px -1px rgba(0,0,0,0.08)',
    '0px 6px 8px -1px rgba(0,0,0,0.10)',
    '0px 8px 10px -1px rgba(0,0,0,0.12)',
    '0px 10px 12px -1px rgba(0,0,0,0.14)',
    '0px 12px 14px -1px rgba(0,0,0,0.16)',
    '0px 14px 16px -1px rgba(0,0,0,0.18)',
    '0px 16px 18px -1px rgba(0,0,0,0.20)',
    '0px 18px 20px -1px rgba(0,0,0,0.22)',
    '0px 20px 22px -1px rgba(0,0,0,0.24)',
    '0px 22px 24px -1px rgba(0,0,0,0.26)',
    '0px 24px 26px -1px rgba(0,0,0,0.28)',
    '0px 26px 28px -1px rgba(0,0,0,0.30)',
    '0px 28px 30px -1px rgba(0,0,0,0.32)',
    '0px 30px 32px -1px rgba(0,0,0,0.34)',
    '0px 32px 34px -1px rgba(0,0,0,0.36)',
    '0px 34px 36px -1px rgba(0,0,0,0.38)',
    '0px 36px 38px -1px rgba(0,0,0,0.40)',
    '0px 38px 40px -1px rgba(0,0,0,0.42)',
    '0px 40px 42px -1px rgba(0,0,0,0.44)',
    '0px 42px 44px -1px rgba(0,0,0,0.46)',
    '0px 44px 46px -1px rgba(0,0,0,0.48)',
    '0px 46px 48px -1px rgba(0,0,0,0.50)',
    '0px 48px 50px -1px rgba(0,0,0,0.52)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
          '&:hover': {
            boxShadow: '0 8px 10px -1px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

// Augment the Theme interface
declare module '@mui/material/styles' {
  interface Theme {
    customShadows: ReturnType<typeof createCustomShadow>
  }
  interface ThemeOptions {
    customShadows?: ReturnType<typeof createCustomShadow>
  }
}

// Add custom shadows to theme
theme.customShadows = createCustomShadow(theme.palette.grey[500])

export default theme
