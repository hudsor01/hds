'use client'

import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Box, CreditCard, Settings, Users } from 'react-feather'

const actions = [
  {
    title: 'Add Property',
    href: { pathname: '/dashboard/properties/new' },
    icon: Box,
    description: 'List a new property in your portfolio'
  },
  {
    title: 'Manage Tenants',
    href: { pathname: '/dashboard/tenants' },
    icon: Users,
    description: 'View and manage your tenants'
  },
  {
    title: 'Process Payments',
    href: { pathname: '/dashboard/payments' },
    icon: CreditCard,
    description: 'Handle rent payments and invoices'
  },
  {
    title: 'Settings',
    href: { pathname: '/dashboard/settings' },
    icon: Settings,
    description: 'Configure your account settings'
  }
]

export function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link key={action.href.pathname} href={action.href}>
          <Card className="h-full p-6 hover:bg-muted/50">
            <action.icon className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 font-semibold">{action.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{action.description}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
