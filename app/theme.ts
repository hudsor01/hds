'use client'

import { createTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  palette: {
    primary: {
      light: '#E3F2FD', // Pastel blue light
      main: '#90CAF9', // Pastel blue main
      dark: '#42A5F5', // Pastel blue dark
      contrastText: '#1A237E'
    },
    secondary: {
      light: '#F3E5F5',
      main: '#CE93D8',
      dark: '#AB47BC',
      contrastText: '#fff'
    },
    success: {
      light: '#E8F5E9',
      main: '#66BB6A',
      dark: '#43A047',
      contrastText: '#fff'
    },
    info: {
      light: '#E1F5FE',
      main: '#29B6F6',
      dark: '#0288D1',
      contrastText: '#fff'
    },
    warning: {
      light: '#FFF8E1',
      main: '#FFA726',
      dark: '#F57C00',
      contrastText: '#fff'
    },
    error: {
      light: '#FFEBEE',
      main: '#EF5350',
      dark: '#C62828',
      contrastText: '#fff'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.3
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4
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
          borderRadius: 8,
          padding: '8px 16px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)'
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none'
        }
      }
    }
  }
})

export default theme
