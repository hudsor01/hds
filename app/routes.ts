// Public Routes
export const publicRoutes = ['/', '/about', '/features', '/pricing', '/contact', '/terms', '/privacy', '/blog'] as const

// Auth Routes
export const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/new-verification'
] as const

export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

// Protected Routes Configuration
export const protectedRoutes = {
  dashboard: {
    path: '/dashboard',
    children: {
      overview: '/dashboard',
      properties: '/dashboard/properties',
      tenants: '/dashboard/tenants',
      leases: '/dashboard/leases',
      maintenance: '/dashboard/maintenance',
      payments: '/dashboard/payments',
      documents: '/dashboard/documents',
      settings: '/dashboard/settings'
    }
  },
  properties: {
    path: '/properties',
    children: {
      list: '/properties',
      create: '/properties/create',
      view: (id: string) => `/properties/${id}`,
      edit: (id: string) => `/properties/${id}/edit`,
      units: (id: string) => `/properties/${id}/units`
    }
  },
  tenants: {
    path: '/tenants',
    children: {
      list: '/tenants',
      create: '/tenants/create',
      view: (id: string) => `/tenants/${id}`,
      edit: () => `/tenants/edit`
    }
  },
  leases: {
    path: '/leases',
    children: {
      list: '/leases',
      create: '/leases/create',
      view: (id: string) => `/leases/${id}`,
      edit: (id: string) => `/leases/${id}/edit`,
      renew: (id: string) => `/leases/${id}/renew`
    }
  },
  maintenance: {
    path: '/maintenance',
    children: {
      list: '/maintenance',
      create: '/maintenance/create',
      view: (id: string) => `/maintenance/${id}`,
      edit: (id: string) => `/maintenance/${id}/edit`
    }
  },
  payments: {
    path: '/payments',
    children: {
      list: '/payments',
      create: '/payments/create',
      view: (id: string) => `/payments/${id}`,
      settings: '/payments/settings'
    }
  },
  settings: {
    path: '/settings',
    children: {
      profile: '/settings/profile',
      account: '/settings/account',
      security: '/settings/security',
      notifications: '/settings/notifications',
      billing: '/settings/billing',
      team: '/settings/team'
    }
  }
} as const

// Route Utilities
export function isPublicRoute(path: string): boolean {
  return publicRoutes.includes(path)
}

export function isAuthRoute(path: string): boolean {
  return authRoutes.includes(path as AuthRoute)
}

export function isProtectedRoute(path: string): boolean {
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
  return Object.values(protectedRoutes).some(route => {
    if (typeof route === 'object') {
      return (
        normalizedPath.startsWith(route.path) ||
        Object.values(route.children).some(childPath =>
          typeof childPath === 'string' ? normalizedPath.startsWith(childPath) : false
        )
      )
    }
    return false
  })
}

// Route metadata for SEO
export const routeMetadata = {
  '/': {
    title: 'Hudson Digital Solutions - Property Management Simplified',
    description: 'Simplify your property management with our comprehensive solution.'
  },
  '/about': {
    title: 'About Us - Hudson Digital Solutions',
    description: 'Learn about our mission and vision in property management.'
  },
  '/features': {
    title: 'Features - Hudson Digital Solutions',
    description: 'Discover the powerful features that make property management easier.'
  },
  '/pricing': {
    title: 'Pricing - Hudson Digital Solutions',
    description: 'Transparent pricing plans for property management solutions.'
  },
  '/contact': {
    title: 'Contact Us - Hudson Digital Solutions',
    description: 'Get in touch with our team for support and inquiries.'
  },
  '/dashboard': {
    title: 'Dashboard - Hudson Digital Solutions',
    description: 'Your property management control center.'
  },
  '/team': {
    title: 'Team - Hudson Digital Solutions',
    description: 'Meet our dedicated team of professionals.'
  }
} as const

// Type exports
export type PublicRoute = (typeof publicRoutes)[number]
export type AuthRoute = (typeof authRoutes)[number]
export type ProtectedRoutes = typeof protectedRoutes
export type RouteMetadata = typeof routeMetadata
