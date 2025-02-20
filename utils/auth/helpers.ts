import { type User } from '@supabase/supabase-js'

export function getUserRole(user: User | null): string | null {
    return user?.user_metadata?.role || null
}

export function hasRole(
    user: User | null,
    requiredRole: string | string[]
): boolean {
    const userRole = getUserRole(user)
    if (!userRole) return false

    const roles = Array.isArray(requiredRole)
        ? requiredRole
        : [requiredRole]
    return roles.includes(userRole)
}

export function isAdmin(user: User | null): boolean {
    return hasRole(user, 'admin')
}

export function isPropertyManager(user: User | null): boolean {
    return hasRole(user, 'property_manager')
}

export function isTenant(user: User | null): boolean {
    return hasRole(user, 'tenant')
}

export const ROLES = {
    ADMIN: 'admin',
    PROPERTY_MANAGER: 'property_manager',
    TENANT: 'tenant'
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export const rolePermissions = {
    [ROLES.ADMIN]: [
        'view_dashboard',
        'manage_users',
        'manage_properties',
        'manage_tenants',
        'manage_payments',
        'view_reports',
        'manage_settings'
    ],
    [ROLES.PROPERTY_MANAGER]: [
        'view_dashboard',
        'manage_properties',
        'manage_tenants',
        'view_payments',
        'view_reports'
    ],
    [ROLES.TENANT]: [
        'view_dashboard',
        'view_property',
        'make_payments',
        'submit_maintenance',
        'view_documents'
    ]
} as const

export type Permission = (typeof rolePermissions)[UserRole][number]

export function hasPermission(
    user: User | null,
    permission: Permission
): boolean {
    const userRole = getUserRole(user)
    if (!userRole || !(userRole in rolePermissions)) return false

    return rolePermissions[userRole as UserRole].includes(permission)
}

export function hasAnyPermission(
    user: User | null,
    permissions: Permission[]
): boolean {
    return permissions.some(permission =>
        hasPermission(user, permission)
    )
}

export function hasAllPermissions(
    user: User | null,
    permissions: Permission[]
): boolean {
    return permissions.every(permission =>
        hasPermission(user, permission)
    )
}

export function getRedirectPath(user: User | null): string {
    const role = getUserRole(user)

    switch (role) {
        case ROLES.ADMIN:
            return '/admin/dashboard'
        case ROLES.PROPERTY_MANAGER:
            return '/dashboard/properties'
        case ROLES.TENANT:
            return '/dashboard'
        default:
            return '/auth/sign-in'
    }
}

export function getUserDisplayName(user: User | null): string {
    if (!user) return ''

    const { user_metadata } = user

    if (user_metadata?.full_name) {
        return user_metadata.full_name
    }

    if (user_metadata?.first_name && user_metadata?.last_name) {
        return `${user_metadata.first_name} ${user_metadata.last_name}`
    }

    return user.email ?? ''
}

export function getInitials(user: User | null): string {
    if (!user) return ''

    const { user_metadata } = user

    if (user_metadata?.first_name && user_metadata?.last_name) {
        return `${user_metadata.first_name[0]}${user_metadata.last_name[0]}`.toUpperCase()
    }

    if (user_metadata?.full_name) {
        const nameParts = user_metadata.full_name.split(' ')
        if (nameParts.length >= 2) {
            return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
        }
        return nameParts[0][0].toUpperCase()
    }

    return user.email?.[0].toUpperCase() ?? ''
}
