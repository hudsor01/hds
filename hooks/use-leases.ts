import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/auth'

export const useLeases = (propertyId?: string) => {
  const fetchLeases = async () => {
    let query = supabase.from('leases').select('*')
    if (propertyId) {
      query = query.eq('property_id', propertyId)
    }
    const { data, error } = await query
    if (error) throw error
    return data
  }

  return useQuery({
    queryKey: ['leases', propertyId],
    queryFn: fetchLeases
  })
}

export const useCreateLease = () => {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('leases').insert([data])
      if (error) throw error
    }
  })
  return mutation
}

export const useUpdateLease = () => {
  const mutation = useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from('leases').update(data).eq('id', id)
      if (error) throw error
    }
  })
  return mutation
}

export const useLeaseActions = () => {
  const queryClient = useQueryClient()

  const deleteLease = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('leases').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] })
    }
  })

  return { deleteLease }
}
