export const routes = {
  dashboard: '/dashboard',
  properties: {
    index: '/dashboard/properties',
    new: '/dashboard/properties/new',
    view: (id: string) => `/dashboard/properties/${id}`,
    edit: (id: string) => `/dashboard/properties/${id}/edit`
  },
  tenants: {
    index: '/dashboard/tenants',
    new: '/dashboard/tenants/new',
    view: (id: string) => `/dashboard/tenants/${id}`,
    edit: (id: string) => `/dashboard/tenants/${id}/edit`
  },
  maintenance: {
    index: '/dashboard/maintenance',
    new: '/dashboard/maintenance/new',
    view: (id: string) => `/dashboard/maintenance/${id}`,
    edit: (id: string) => `/dashboard/maintenance/${id}/edit`
  },
  leases: {
    index: '/dashboard/leases',
    new: '/dashboard/leases/new',
    view: (id: string) => `/dashboard/leases/${id}`,
    edit: (id: string) => `/dashboard/leases/${id}/edit`
  },
  documents: {
    index: '/dashboard/documents',
    new: '/dashboard/documents/new',
    view: (id: string) => `/dashboard/documents/${id}`,
    edit: (id: string) => `/dashboard/documents/${id}/edit`
  },
  settings: '/dashboard/settings'
} as const

export type AppRoutes = typeof routes
