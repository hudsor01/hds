import { createCrudHooks } from '@/lib/hooks/use-crud'
import { type Property } from '@/types'

export const {
  useList: useProperties,
  useItem: useProperty,
  useCreate: useCreateProperty,
  useUpdate: useUpdateProperty,
  useDelete: useDeleteProperty,
} = createCrudHooks<Property>({
  resourceName: 'Property',
  endpoint: 'properties',
});
