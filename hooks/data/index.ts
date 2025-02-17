/// <reference lib="dom" />

import { useApiDelete, useApiMutation, useApiQuery, useApiUpdate } from '@/hooks/use-api'
import { useState, useEffect, useCallback, useTransition } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import type { Property, Tenant, QueryParams } from '@/types/types'

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
  onSuccess?: (data: Property | undefined, action: 'create' | 'update' | 'delete') => void | Promise<void>
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROPERTIES_QUERY_KEY })
      if (showToasts) {
        toast.success('Property deleted successfully')
      }
      onSuccess?.(undefined, 'delete')
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
      try {
        startTransition(() => {})
        result = await updateMutation.mutateAsync({ id, data })
      } catch (err) {
        const error = err as PropertyError
        if (error.status === 422) {
          toast.error('Please check the property details and try again')
        }
        throw error
      }
      return result
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

export type PropertyCreateInput = Omit<Property, 'id'>

export type PropertyUpdateInput = Partial<Omit<Property, 'id'>>

// Tenants hooks
export function useTenants(
  params?: Omit<QueryParams, 'filters'> & { filters?: Record<string, string | number | boolean | undefined> }
) {
  return useApiQuery<Tenant[]>('/api/tenants', params as any)
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
export interface Lease {
  // Define the properties of a Lease here
  id: string
  [key: string]: any
}

export function useLeases(
  params?: Omit<QueryParams, 'filters'> & { filters?: Record<string, string | number | boolean | undefined> }
) {
  return useApiQuery<Lease[]>('/api/leases', params as any)
}

export function useLease(id: string) {
  return useApiQuery<any>(`/api/leases/${id}`)
}

export function useCreateLease() {
  return useApiMutation<any, any>('/api/leases')
}

export function useUpdateLease() {
  return useApiUpdate<any>('/api/leases')
}

export function useDeleteLease() {
  return useApiDelete<any>('/api/leases')
}

export function useMaintenanceRequests(
  params?: Omit<QueryParams, 'filters'> & { filters?: Record<string, string | number | boolean | undefined> }
) {
  return useApiQuery<any[]>('/api/maintenance', params as any)
}

export function useMaintenanceRequest(id: string) {
  return useApiQuery<any>(`/api/maintenance/${id}`)
}

export function useCreateMaintenanceRequest() {
  return useApiMutation<any, any>('/api/maintenance')
}

export function useUpdateMaintenanceRequest() {
  return useApiUpdate<any>('/api/maintenance')
}

export function useDeleteMaintenanceRequest() {
  return useApiDelete<any>('/api/maintenance')
}

// Scroll position hook
export function useScroll(threshold = 100) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { scrolled, scrollToTop }
}

// Toast notifications hook
export function useToast() {
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    open: boolean
  }>({
    message: '',
    type: 'info',
    open: false
  })

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setToast({ message, type, open: true })
  }, [])

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, open: false }))
  }, [])

  return { toast, showToast, hideToast }
}

// User preferences hook
interface Preferences {
  [key: string]: any
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    if (typeof window === 'undefined') return {}
    const storedPreferences = localStorage.getItem('user_preferences')
    return storedPreferences ? JSON.parse(storedPreferences) : {}
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem('user_preferences', JSON.stringify(preferences))
  }, [preferences])

  const updatePreference = useCallback((key: string, value: unknown) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }, [])

  return { preferences, updatePreference }
}

export function useData<T>() {
  return {
    data: null as T | null,
    error: null as string | null,
    isLoading: false,
    mutate: async () => {} // Add proper implementation
  } as const
}
