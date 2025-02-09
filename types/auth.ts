export type UserRole = 'ADMIN' | 'PROPERTY_MANAGER' | 'LANDLORD' | 'TENANT'

export interface User {
  id: string
  role: UserRole
  email: string
  isAuthenticated: boolean
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: Error | null
}

export interface UserPermissions {
  canViewAllProperties: boolean
  canManageProperties: boolean
  canViewAllTenants: boolean
  canManageTenants: boolean
  canViewAllPayments: boolean
  canManagePayments: boolean
  canViewReports: boolean
  canManageSettings: boolean
}

export const DEFAULT_ROLE_PERMISSIONS: Record<UserRole, UserPermissions> = {
  ADMIN: {
    canViewAllProperties: true,
    canManageProperties: true,
    canViewAllTenants: true,
    canManageTenants: true,
    canViewAllPayments: true,
    canManagePayments: true,
    canViewReports: true,
    canManageSettings: true,
  },
  PROPERTY_MANAGER: {
    canViewAllProperties: true,
    canManageProperties: true,
    canViewAllTenants: true,
    canManageTenants: true,
    canViewAllPayments: true,
    canManagePayments: true,
    canViewReports: true,
    canManageSettings: false,
  },
  LANDLORD: {
    canViewAllProperties: false,
    canManageProperties: false,
    canViewAllTenants: false,
    canManageTenants: false,
    canViewAllPayments: false,
    canManagePayments: false,
    canViewReports: true,
    canManageSettings: false,
  },
  TENANT: {
    canViewAllProperties: false,
    canManageProperties: false,
    canViewAllTenants: false,
    canManageTenants: false,
    canViewAllPayments: false,
    canManagePayments: false,
    canViewReports: false,
    canManageSettings: false,
  },
}
