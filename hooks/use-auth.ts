import {api} from '@/lib/api';
import {DEFAULT_ROLE_PERMISSIONS, type UserPermissions, type UserRole} from '@/types/auth';
import {useAuth, useUser} from '@clerk/nextjs';
import {useQuery} from '@tanstack/react-query';

export function useRoleBasedAccess() {
  const {isLoaded, isSignedIn} = useAuth();
  const {user} = useUser();

  const {data: userRole} = useQuery({
    queryKey: ['user-role', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await api.get(`/api/users/${user.id}/role`);
      return response.data?.role as UserRole;
    },
    enabled: !!user?.id,
  });

  const permissions: UserPermissions = userRole
    ? DEFAULT_ROLE_PERMISSIONS[userRole]
    : {
        canViewAllProperties: false,
        canManageProperties: false,
        canViewAllTenants: false,
        canManageTenants: false,
        canViewAllPayments: false,
        canManagePayments: false,
        canViewReports: false,
        canManageSettings: false,
      };

  return {
    isLoaded,
    isSignedIn,
    role: userRole,
    permissions,
    isAdmin: userRole === 'ADMIN',
    isPropertyManager: userRole === 'PROPERTY_MANAGER',
    isLandlord: userRole === 'LANDLORD',
    isTenant: userRole === 'TENANT',
  };
}
