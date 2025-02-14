import { useApiDelete, useApiMutation, useApiQuery, useApiUpdate } from '../use-api'
import type { BaseQueryParams } from '@/types/common'
import type { Lease, MaintenanceRequest, Tenant, Property } from '@/types/db.types'
import { useState, useCallback, useTransition } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { PropertyCreateInput, PropertyUpdateInput } from '@/types/db.types'

export function useProperty(id: string) {
  return useApiQuery<Property>(`/api/properties/${id}`)
}

export function useCreateProperty() {
  return useApiMutation<Property, Omit<Property, 'id'>>('/api/properties')
}

export function useUpdateProperty() {
  return useApiUpdate<Property>('/api/properties')
}

interface UsePropertiesOptions {
  onSuccess?: (data: Property, action: 'create' | 'update' | 'delete') => void | Promise<void>
  onError?: (error: Error, action: 'create' | 'update' | 'delete') => void | Promise<void>
  showToasts?: boolean
  initialData?: Property[]
}

interface PropertyError extends Error {
  code?: string
  status?: number
  validationErrors?: Record<string, string[]>
}

interface UsePropertiesReturn {
  // Queries
  properties: Property[] | undefined
  isLoading: boolean
  error: PropertyError | null

  // Mutations
  createProperty: (data: PropertyCreateInput) => Promise<Property>
  updateProperty: (id: string, data: PropertyUpdateInput) => Promise<Property>
  deleteProperty: (id: string) => Promise<void>

  // States
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  isPending: boolean

  // Utils
  refetchProperties: () => Promise<void>
  resetError: () => void
}

const PROPERTIES_QUERY_KEY = ['properties']

export function useProperties({
  onSuccess,
  onError,
  showToasts = true,
  initialData
}: UsePropertiesOptions = {}): UsePropertiesReturn {
  const queryClient = useQueryClient()
  const [error, setError] = useState<PropertyError | null>(null)
  const [isPending, startTransition] = useTransition()

  // Query for fetching properties
  const {
    data: properties,
    isLoading,
    refetch
  } = useQuery({
    queryKey: PROPERTIES_QUERY_KEY,
    queryFn: async () => {
      const response = await axios.get('/api/properties')
      return response.data
    },
    initialData
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: PropertyCreateInput) => {
      const response = await axios.post('/api/properties', data)
      return response.data
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY })
      if (showToasts) {
        toast.success('Property created successfully')
      }
      onSuccess?.(data, 'create')
    },
    onError: (err: PropertyError) => {
      setError(err)
      if (showToasts) {
        toast.error('Failed to create property')
      }
      onError?.(err, 'create')
    }
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: PropertyUpdateInput }) => {
      const response = await axios.patch(`/api/properties/${id}`, data)
      return response.data
    },
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY })
      if (showToasts) {
        toast.success('Property updated successfully')
      }
      onSuccess?.(data, 'update')
    },
    onError: (err: PropertyError) => {
      setError(err)
      if (showToasts) {
        toast.error('Failed to update property')
      }
      onError?.(err, 'update')
    }
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/properties/${id}`)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY })
      if (showToasts) {
        toast.success('Property deleted successfully')
      }
      onSuccess?.(variables, 'delete')
    },
    onError: (err: PropertyError) => {
      setError(err)
      if (showToasts) {
        toast.error('Failed to delete property')
      }
      onError?.(err, 'delete')
    }
  })

  // Wrapped mutation handlers with transitions
  const createProperty = useCallback(
    async (data: PropertyCreateInput) => {
      let result: Property
      try {
        startTransition(() => {})
        result = await createMutation.mutateAsync(data)
      } catch (err) {
        const error = err as PropertyError
        if (error.status === 422) {
          toast.error('Please check the property details and try again')
        }
        throw error
      }
      return result
    },
    [createMutation]
  )

  const updateProperty = useCallback(
    async (id: string, data: PropertyUpdateInput) => {
      let result: Property
      startTransition(async () => {
        try {
          result = await updateMutation.mutateAsync({ id, data })
          return result
        } catch (err) {
          const error = err as PropertyError
          if (error.status === 422) {
            toast.error('Please check the property details and try again')
          }
          throw error
        }
      })
      return result!
    },
    [updateMutation]
  )

  const deleteProperty = useCallback(
    async (id: string) => {
      startTransition(async () => {
        try {
          await deleteMutation.mutateAsync(id)
        } catch (err) {
          const error = err as PropertyError
          if (error.status === 404) {
            toast.error('Property not found')
          }
          throw error
        }
      })
    },
    [deleteMutation]
  )

  const refetchProperties = useCallback(async () => {
    await refetch()
  }, [refetch])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // Queries
    properties,
    isLoading,
    error,

    // Mutations
    createProperty,
    updateProperty,
    deleteProperty,

    // States
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isPending,

    // Utils
    refetchProperties,
    resetError
  }
}

// Additional types for better TypeScript support
export type UsePropertiesHook = typeof useProperties

// Tenants hooks
export function useTenants(params?: BaseQueryParams) {
  return useApiQuery<Tenant[]>('/api/tenants', params)
}

export function useTenant(id: string) {
  return useApiQuery<Tenant>(`/api/tenants/${id}`)
}

export function useCreateTenant() {
  return useApiMutation<Tenant, Omit<Tenant, 'id'>>('/api/tenants')
}

export function useUpdateTenant() {
  return useApiUpdate<Tenant>('/api/tenants')
}

export function useDeleteTenant() {
  return useApiDelete<Tenant>('/api/tenants')
}

// Leases hooks
export function useLeases(params?: BaseQueryParams) {
  return useApiQuery<Lease[]>('/api/leases', params)
}

export function useLease(id: string) {
  return useApiQuery<Lease>(`/api/leases/${id}`)
}

export function useCreateLease() {
  return useApiMutation<Lease, Omit<Lease, 'id'>>('/api/leases')
}

export function useUpdateLease() {
  return useApiUpdate<Lease>('/api/leases')
}

export function useDeleteLease() {
  return useApiDelete<Lease>('/api/leases')
}

// Maintenance hooks
export function useMaintenanceRequests(params?: BaseQueryParams) {
  return useApiQuery<MaintenanceRequest[]>('/api/maintenance', params)
}

export function useMaintenanceRequest(id: string) {
  return useApiQuery<MaintenanceRequest>(`/api/maintenance/${id}`)
}

export function useCreateMaintenanceRequest() {
  return useApiMutation<MaintenanceRequest, Omit<MaintenanceRequest, 'id'>>('/api/maintenance')
}

export function useUpdateMaintenanceRequest() {
  return useApiUpdate<MaintenanceRequest>('/api/maintenance')
}

export function useDeleteMaintenanceRequest() {
  return useApiDelete<MaintenanceRequest>('/api/maintenance')
}
