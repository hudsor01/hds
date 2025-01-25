"use client";

import { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation: Array<{ name: string; href: Route }> = [
  { name: 'About', href: '/about' as Route },
  { name: 'Features', href: '/features' as Route },
  { name: 'Pricing', href: '/pricing' as Route },
  { name: 'Contact', href: '/contact' as Route },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-pastel-blue-600">HDS</span>
          </Link>

          {/* Centered Navigation */}
          <nav aria-label="Global" className="flex flex-1 justify-center">
            <ul className="flex items-center gap-8 text-sm">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors ${
                      pathname === item.href
                        ? 'text-pastel-blue-600'
                        : 'text-gray-600 hover:text-pastel-blue-500'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link
              className="rounded-md bg-pastel-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-pastel-blue-700 transition-colors"
              href="/auth/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
