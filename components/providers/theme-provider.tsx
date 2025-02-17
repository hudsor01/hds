'use client'

import { createTheme, ThemeProvider as MuiThemeProvider, type Theme, type ThemeOptions } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect, useState, useMemo } from 'react'

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    '2xl': true
  }
}

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.2
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.2
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.2
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.2
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57
    },
    button: {
      textTransform: 'none',
      fontWeight: 500
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.66
    }
  },
  shape: {
    borderRadius: 8
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '6px',
          fontWeight: 500,
          padding: '6px 16px'
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        sizeSmall: {
          padding: '4px 12px',
          fontSize: '0.875rem'
        },
        sizeLarge: {
          padding: '8px 20px',
          fontSize: '1rem'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        variant: 'outlined'
      },
      styleOverrides: {
        root: {
          borderRadius: '6px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '16px'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '16px'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '12px'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '20px 24px 12px'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '12px 24px 20px',
          '&:first-of-type': {
            paddingTop: '12px'
          }
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '12px 24px 20px'
        }
      }
    }
  }
}

const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF'
    },
    divider: 'rgba(0, 0, 0, 0.12)'
  }
})

const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#3B82F6',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
      contrastText: '#FFFFFF'
    },
    error: {
      main: '#F87171',
      light: '#FCA5A5',
      dark: '#EF4444',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FBBF24',
      light: '#FCD34D',
      dark: '#F59E0B',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#3B82F6',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#34D399',
      light: '#6EE7B7',
      dark: '#10B981',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#111827',
      paper: '#1F2937'
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#6B7280'
    },
    divider: 'rgba(255, 255, 255, 0.12)'
  }
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check for system dark mode preference
    const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(darkModePreference.matches)

    // Listen for system dark mode changes
    const handler = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }
    darkModePreference.addEventListener('change', handler)
    return () => {
      darkModePreference.removeEventListener('change', handler)
    }
  }, [])

  // Memoize the current theme to prevent unnecessary re-renders
  const currentTheme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode])

  // Prevent SSR flash
  if (!mounted) {
    return null
  }

  return (
    <MuiThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

// Export themes and types for use in other components
export type AppTheme = Theme
export const themes = {
  light: lightTheme,
  dark: darkTheme
}
