'use client'

import { createTheme } from '@mui/material/styles'
import { Playfair_Display as PlayfairDisplay, Roboto } from 'next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
})

export const playfair = PlayfairDisplay({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false
})

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3',
      light: '#64B5F6',
      dark: '#1976D2',
      contrastText: '#fff'
    },
    secondary: {
      main: '#F50057',
      light: '#FF4081',
      dark: '#C51162',
      contrastText: '#fff'
    },
    text: {
      primary: '#1A2027',
      secondary: '#3E5060'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h1: {
      fontFamily: playfair.style.fontFamily
    },
    h2: {
      fontFamily: playfair.style.fontFamily
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '0.75rem'
        }
      }
    }
  }
})

export default theme
