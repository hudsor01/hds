import {createCrudHooks} from '@/lib/hooks/use-crud';
import {type MaintenanceRequest} from '@/types';

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
