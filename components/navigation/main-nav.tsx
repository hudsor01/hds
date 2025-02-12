'use client'

import Link from 'next/link'
import * as React from 'react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Properties', href: '/properties' },
  { name: 'Tenant', href: '/tenant' },
  { name: 'Settings', href: '/settings' }
]

export function MainNav(): React.ReactElement {
  return (
    <nav>
      <Link href="/">Property Manager</Link>
      {navigation.map(item => (
        <Link key={item.href} href={item.href}>
          {item.name}
        </Link>
      ))}
      <div>
        <Link href="/auth/login">Sign in</Link>
      </div>
    </nav>
  )
}
