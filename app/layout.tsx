'use client'

import { Navbar } from '@/components/layout/navbar'
import { Providers } from '@/components/providers'
import { NotificationProvider } from '@/components/ui/notification'
import { cn } from '@/lib/utils'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { Inter, Roboto } from 'next/font/google'
import { useEffect, useState } from 'react'

// Font configuration
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Enhanced MUI theme
const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto), sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    button: {
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  palette: {
    primary: {
      main: '#B7DCFF',
      light: '#D5EAFF',
      dark: '#86B7FF',
      contrastText: '#1A365D',
    },
    secondary: {
      main: '#9BA3AF',
      light: '#CBD5E1',
      dark: '#64748B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          padding: '10px 20px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #B7DCFF 0%, #86B7FF 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #D5EAFF 0%, #B7DCFF 100%)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            },
            '&.Mui-focused': {
              boxShadow: '0 4px 12px rgba(183,220,255,0.2)',
            },
          },
        },
      },
    },
  },
})

// Enhanced page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

// Loader animation
const Loader = () => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="w-16 h-16 border-4 border-primary rounded-full border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    const timer = setTimeout(() => setIsLoading(false), 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          roboto.variable,
          inter.variable
        )}
      >
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Providers>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <Loader key="loader" />
                ) : (
                  <>
                    <Navbar scrolled={scrolled} />
                    <motion.main
                      className="font-primary pt-16"
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      variants={pageVariants}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {children}
                      </motion.div>
                    </motion.main>
                  </>
                )}
              </AnimatePresence>
            </Providers>
            <NotificationProvider />
          </ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  )
}
