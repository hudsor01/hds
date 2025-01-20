'use client'

import { Navbar } from '@/components/layout/navbar'
import { Providers } from '@/components/providers'
import { NotificationProvider } from '@/components/ui/notification'
import { cn } from '@/lib/utils'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import theme from './theme'

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
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ background: theme.palette.background.paper }}
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="w-16 h-16 rounded-full"
      style={{
        border: `4px solid ${theme.palette.primary.main}`,
        borderTopColor: 'transparent',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
)

export default function ClientLayout({
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
    <motion.div
      className="min-h-screen"
      style={{ background: theme.palette.background.default }}
    >
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <Loader key="loader" />
                ) : (
                  <>
                    <Navbar scrolled={scrolled} />
                    <motion.main
                      className={cn("pt-16", theme.typography.fontFamily)}
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
              <NotificationProvider />
            </Providers>
          </NextThemeProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
      <Toaster position="top-right" />
    </motion.div>
  )
}
