import type {Route} from 'next';

export const routes = {
  // Public routes
  home: '/' as Route,
  contact: '/contact' as Route,
  pricing: '/pricing' as Route,
  features: '/features' as Route,
  mvp: '/mvp' as Route,

  // Auth routes
  auth: {
    signIn: '/sign-in' as Route,
    signUp: '/sign-up' as Route,
    callback: '/auth/callback' as Route,
    error: '/auth/error' as Route,
    verify: '/verify-email' as Route,
    forgotPassword: '/forgot-password' as Route,
    resetPassword: '/reset-password' as Route,
  },

  // Dashboard routes
  dashboard: '/dashboard' as Route,
  analytics: '/dashboard/analytics' as Route,
  settings: '/dashboard/settings' as Route,

  // Property management
  properties: {
    index: '/dashboard/properties' as Route,
    new: '/dashboard/properties/new' as Route,
    view: (id: string) => `/dashboard/properties/${id}` as Route,
    edit: (id: string) => `/dashboard/properties/${id}/edit` as Route,
  },

  // Tenant management
  tenants: {
    index: '/dashboard/tenants' as Route,
    new: '/dashboard/tenants/new' as Route,
    view: (id: string) => `/dashboard/tenants/${id}` as Route,
    edit: (id: string) => `/dashboard/tenants/${id}/edit` as Route,
  },

  // Maintenance management
  maintenance: {
    index: '/dashboard/maintenance' as Route,
    new: '/dashboard/maintenance/new' as Route,
    view: (id: string) => `/dashboard/maintenance/${id}` as Route,
    edit: (id: string) => `/dashboard/maintenance/${id}/edit` as Route,
  },

  // Lease management
  leases: {
    index: '/dashboard/leases' as Route,
    new: '/dashboard/leases/new' as Route,
    view: (id: string) => `/dashboard/leases/${id}` as Route,
    edit: (id: string) => `/dashboard/leases/${id}/edit` as Route,
  },

  // Document management
  documents: {
    index: '/dashboard/documents' as Route,
    new: '/dashboard/documents/new' as Route,
    view: (id: string) => `/dashboard/documents/${id}` as Route,
    edit: (id: string) => `/dashboard/documents/${id}/edit` as Route,
    category: (category: string, id?: string) =>
      id ? `/documents/${category}/${id}` : (`/documents/${category}` as Route),
  },

  // Financial management
  finances: {
    index: '/dashboard/finances' as Route,
    new: '/dashboard/finances/new' as Route,
    view: (id: string) => `/dashboard/finances/${id}` as Route,
    edit: (id: string) => `/dashboard/finances/${id}/edit` as Route,
  },
} as const;

// Route protection configurations
export const protectedPaths = [
  '/dashboard/:path*',
  '/properties/:path*',
  '/tenants/:path*',
  '/maintenance/:path*',
  '/documents/:path*',
  '/finances/:path*',
  '/leases/:path*',
];

export const publicPaths = [
  '/',
  '/contact',
  '/pricing',
  '/features',
  '/mvp',
  '/sign-in',
  '/sign-up',
  '/auth/:path*',
  '/api/public/:path*',
];

export const apiPaths = ['/api/:path*'];

export type AppRoutes = typeof routes;
