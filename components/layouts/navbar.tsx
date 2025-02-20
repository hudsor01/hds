'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { Button } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-md dark:bg-gray-900/80' 
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="group flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center transform transition-transform group-hover:scale-105">
                <span className="text-xl font-bold text-white">HD</span>
              </div>
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">
                Hudson Digital
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <div className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-sky-500'
                      : 'text-gray-600 hover:text-sky-500 dark:text-gray-300 dark:hover:text-sky-400'
                  } group`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 transform origin-left transition-transform duration-200 ${
                    pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button
              component={Link}
              href="/login"
              variant="text"
              className="text-gray-600 hover:text-sky-500 transition-colors duration-200"
            >
              Login
            </Button>
            
            <Button
              component={Link}
              href="/signup"
              className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-sky-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-sky-500 bg-sky-50 dark:bg-sky-900/20'
                    : 'text-gray-600 hover:text-sky-500 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Button
                component={Link}
                href="/login"
                fullWidth
                variant="outlined"
                className="text-gray-600 border-gray-300 hover:border-sky-500 hover:text-sky-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Button>
              <Button
                component={Link}
                href="/signup"
                fullWidth
                className="bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}