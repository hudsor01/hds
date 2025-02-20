import { useAppSelector } from '@/store/hooks'
import {
    hasRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    type Permission,
    type UserRole
} from '@/utils/auth/helpers'

export function usePermissions() {
    const { user } = useAppSelector(state => state.auth)

    return {
        hasRole: (role: UserRole | UserRole[]) => hasRole(user, role),
        hasPermission: (permission: Permission) =>
            hasPermission(user, permission),
        hasAnyPermission: (permissions: Permission[]) =>
            hasAnyPermission(user, permissions),
        hasAllPermissions: (permissions: Permission[]) =>
            hasAllPermissions(user, permissions),
        isAdmin: hasRole(user, 'admin'),
        isPropertyManager: hasRole(user, 'property_manager'),
        isTenant: hasRole(user, 'tenant'),
        user
    }
}
