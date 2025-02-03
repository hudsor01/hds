export const PERMISSIONS = {
  MANAGE_PROPERTIES: 'manage_properties',
  MANAGE_TENANTS: 'manage_tenants',
  MANAGE_MAINTENANCE: 'manage_maintenance',
  VIEW_REPORTS: 'view_reports',
  MANAGE_BILLING: 'manage_billing',
} as const;

export const ROLE_PERMISSIONS = {
  OWNER: Object.values(PERMISSIONS),
  PROPERTY_MANAGER: [
    PERMISSIONS.MANAGE_PROPERTIES,
    PERMISSIONS.MANAGE_TENANTS,
    PERMISSIONS.MANAGE_MAINTENANCE,
    PERMISSIONS.VIEW_REPORTS,
  ],
  MAINTENANCE: [PERMISSIONS.MANAGE_MAINTENANCE],
  TENANT: [],
} as const;

export type UserRole = 'ADMIN' | 'OWNER' | 'MANAGER' | 'USER';

export interface UserRoleMetadata {
  role?: UserRole;
}

export function isValidRole(role: string): role is UserRole {
  return ['ADMIN', 'OWNER', 'MANAGER', 'USER'].includes(role as UserRole);
}
