// hooks/use-tenants.ts
import {createCrudHooks} from '@/lib/hooks/use-crud';
import {type Tenant} from '@/types';

export const {
  useList: useTenants,
  useItem: useTenant,
  useCreate: useCreateTenant,
  useUpdate: useUpdateTenant,
  useDelete: useDeleteTenant,
} = createCrudHooks<Tenant>({
  resourceName: 'Tenant',
  endpoint: 'tenants',
});
