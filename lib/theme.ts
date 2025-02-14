'use client'

import { createTheme } from '@mui/material/styles'
import { ThemeOptions } from '@mui/material/styles'
import { Playfair_Display, Roboto } from 'next/font/google'

// Initialize fonts using the exact packages from the original package.json
// Using @fontsource/playfair-display and @fontsource/roboto
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
})

// Theme configuration using only components available in the specified @mui versions
const themeOptions: ThemeOptions = {
  typography: {
    fontFamily: 'var(--font-sans)',
    h1: {
      fontFamily: playfair.style.fontFamily
    },
    h2: {
      fontFamily: playfair.style.fontFamily
    },
    h3: {
      fontFamily: playfair.style.fontFamily
    },
    button: {
      textTransform: 'none'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px'
        }
      }
    }
  },
  palette: {
    primary: {
      main: 'var(--color-primary)',
      light: 'var(--color-primary-light)',
      dark: 'var(--color-primary-dark)'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    },
    text: {
      primary: 'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)'
    },
    background: {
      default: 'var(--color-background-app)',
      paper: 'var(--color-background-ui)'
    }
  },
  shape: {
    borderRadius: 8
  }
}

export const theme = createTheme(themeOptions)
