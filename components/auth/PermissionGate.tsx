'use client'

import { type ReactNode } from 'react'
import { usePermissions } from '@/hooks/usePermissions'
import type { Permission, UserRole } from '@/utils/auth/helpers'

interface PermissionGateProps {
    children: ReactNode
    permissions?: Permission[]
    roles?: UserRole[]
    requireAll?: boolean
    fallback?: ReactNode
}

export function PermissionGate({
    children,
    permissions = [],
    roles = [],
    requireAll = true,
    fallback = null
}: PermissionGateProps) {
    const { hasRole, hasAllPermissions, hasAnyPermission } =
        usePermissions()

    const hasRequiredRoles = roles.length === 0 || hasRole(roles)
    const hasRequiredPermissions =
        permissions.length === 0 ||
        (requireAll
            ? hasAllPermissions(permissions)
            : hasAnyPermission(permissions))

    if (!hasRequiredRoles || !hasRequiredPermissions) {
        return <>{fallback}</>
    }

    return <>{children}</>
}
