import {createCrudHooks} from '@/hooks/use-crud';
import type {Tenant} from '@/types/tenant';

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
