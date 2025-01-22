import type { Route } from 'next'

export const routes = {
  home: '/' as Route,
  dashboard: '/dashboard' as Route,
  properties: {
    index: '/dashboard/properties' as Route,
    new: '/dashboard/properties/new' as Route,
    view: (id: string) => `/dashboard/properties/${id}` as Route,
    edit: (id: string) => `/dashboard/properties/${id}/edit` as Route,
  },
  tenants: {
    index: '/dashboard/tenants' as Route,
    new: '/dashboard/tenants/new' as Route,
    view: (id: string) => `/dashboard/tenants/${id}` as Route,
    edit: (id: string) => `/dashboard/tenants/${id}/edit` as Route,
  },
  maintenance: {
    index: '/dashboard/maintenance' as Route,
    new: '/dashboard/maintenance/new' as Route,
    view: (id: string) => `/dashboard/maintenance/${id}` as Route,
    edit: (id: string) => `/dashboard/maintenance/${id}/edit` as Route,
  },
  leases: {
    index: '/dashboard/leases' as Route,
    new: '/dashboard/leases/new' as Route,
    view: (id: string) => `/dashboard/leases/${id}` as Route,
    edit: (id: string) => `/dashboard/leases/${id}/edit` as Route,
  },
  documents: {
    index: '/dashboard/documents' as Route,
    new: '/dashboard/documents/new' as Route,
    view: (id: string) => `/dashboard/documents/${id}` as Route,
    edit: (id: string) => `/dashboard/documents/${id}/edit` as Route,
  },
  settings: '/dashboard/settings' as Route,
  auth: {
    login: '/auth/login' as Route,
    register: '/auth/register' as Route,
    verifyEmail: '/auth/verify-email' as Route,
    forgotPassword: '/auth/forgot-password' as Route,
    resetPassword: '/auth/reset-password' as Route,
  },
} as const

export type AppRoutes = typeof routes
