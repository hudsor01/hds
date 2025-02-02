// hooks/use-leases.ts
import { createCrudHooks } from '@/lib/hooks/use-crud'
import { type Lease } from '@/types'

export const {
  useList: useLeases,
  useItem: useLease,
  useCreate: useCreateLease,
  useUpdate: useUpdateLease,
  useDelete: useDeleteLease,
} = createCrudHooks<Lease>({
  resourceName: 'Lease',
  endpoint: 'leases',
  onCreateSuccess: () => {
    toast.success('Lease created successfully');
  },
  onUpdateSuccess: () => {
    toast.success('Lease updated successfully');
  },
});

// Custom hook for lease-specific actions
export function useLeaseActions(leaseId: string) {
  const queryClient = useQueryClient();

  const terminate = useMutation({
    mutationFn: async () =>
      apiClient.post(`/api/leases/${leaseId}/terminate`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] });
      toast.success('Lease terminated successfully');
    },
  });

  const renew = useMutation({
    mutationFn: async (renewalData: LeaseRenewalData) =>
      apiClient.post(`/api/leases/${leaseId}/renew`, renewalData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] });
      toast.success('Lease renewed successfully');
    },
  });

  return { terminate, renew };
}
