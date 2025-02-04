// hooks/use-tenants.ts
import type {Tenant} from './types/tenant';
import {createCrudHooks} from '@/hooks/use-crud';

// Changed to relative path

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
