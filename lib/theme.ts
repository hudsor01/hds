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
    fontFamily: roboto.style.fontFamily,
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
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  }
}

export const theme = createTheme(themeOptions)
