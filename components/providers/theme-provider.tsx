'use client'

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState } from 'react'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3B82F6' // blue-500
    },
    secondary: {
      main: '#10B981' // emerald-500
    },
    error: {
      main: '#EF4444' // red-500
    },
    background: {
      default: '#F9FAFB', // gray-50
      paper: '#FFFFFF'
    },
    text: {
      primary: '#111827', // gray-900
      secondary: '#4B5563' // gray-600
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif'
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#60A5FA' // blue-400
    },
    secondary: {
      main: '#34D399' // emerald-400
    },
    error: {
      main: '#F87171' // red-400
    },
    background: {
      default: '#111827', // gray-900
      paper: '#1F2937' // gray-800
    },
    text: {
      primary: '#F9FAFB', // gray-50
      secondary: '#D1D5DB' // gray-300
    }
  },
  typography: {
    fontFamily: '"Roboto", sans-serif'
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModePreference.matches)

    const handler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }
    darkModePreference.addEventListener('change', handler)
    return () => {
      darkModePreference.removeEventListener('change', handler)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <MuiThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
