import {createCrudHooks} from '@/hooks/use-crud';
import type {MaintenanceRequest} from 'types/maintenance-request';

export const {
  useList: useMaintenanceRequests,
  useItem: useMaintenanceRequest,
  useCreate: useCreateMaintenanceRequest,
  useUpdate: useUpdateMaintenanceRequest,
  useDelete: useDeleteMaintenanceRequest,
} = createCrudHooks<MaintenanceRequest>({
  resourceName: 'Maintenance Request',
  endpoint: 'maintenance-requests',
});
