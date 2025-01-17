'use client'

import { ThemeSwitcher } from '@/components/theme-switcher'
import { Button } from '@/components/ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { Roboto } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.1,
      type: "spring",
      stiffness: 300,
      damping: 25
    }
  })
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background">
            {!pathname.startsWith('/dashboard') && (
              <motion.header
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                initial="hidden"
                animate="visible"
                variants={navVariants}
              >
                <nav className="container flex h-16 items-center justify-between">
                  <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center space-x-2">
                      <motion.span
                        className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17
                        }}
                      >
                        Hudson Digital Solutions
                      </motion.span>
                    </Link>
                    <div className="hidden md:flex gap-6">
                      <motion.div
                        className="flex gap-6"
                        variants={navVariants}
                      >
                        {[
                          { href: { pathname: '/about' }, label: 'About' },
                          { href: { pathname: '/features' }, label: 'Features' },
                          { href: { pathname: '/pricing' }, label: 'Pricing' },
                          { href: { pathname: '/contact' }, label: 'Contact' },
                        ].map((item, index) => (
                          <motion.div
                            key={item.href.pathname}
                            custom={index + 1}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href={item.href}>
                              <Button
                                variant="ghost"
                                className={pathname === item.href.pathname ? 'bg-accent' : ''}
                              >
                                {item.label}
                              </Button>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    className="flex items-center gap-4"
                    variants={navVariants}
                  >
                    <ThemeSwitcher />
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={{ pathname: '/login' }}>
                        <Button variant="ghost" className="mr-2">Log in</Button>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href={{ pathname: '/signup' }}>
                        <Button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                          Sign up
                        </Button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </nav>
              </motion.header>
            )}
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
