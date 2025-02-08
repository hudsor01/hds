import { UserRole } from '@prisma/client';

export function checkRole(
  userRole: string | null | undefined,
  requiredRole: string,
  allowHigherRoles = true,
): boolean {
  if (!userRole) return false;

  const roleHierarchy: Record<string, number> = {
    SUPER_ADMIN: 100,
    ADMIN: 90,
    PROPERTY_MANAGER: 80,
    PROPERTY_OWNER: 70,
    MAINTENANCE: 60,
    TENANT: 50,
    USER: 10,
  };

  const userRoleLevel = roleHierarchy[userRole] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole] || 0;

  return allowHigherRoles
    ? userRoleLevel >= requiredRoleLevel
    : userRoleLevel === requiredRoleLevel;
}
