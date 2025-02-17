'use client'

import { useAuth } from '@/components/providers/auth-provider'
import useSupabaseData from '@/lib/supabase/use-supabase-data'
import { Skeleton } from '@/components/skeleton'
import { PropertyCard } from './property-card'

export function PropertyList() {
  const { user } = useAuth()
  const {
    data: properties,
    loading,
    error
  } = useSupabaseData('properties', {
    realtime: true,
    select: '*, tenants(*)',
    filter: [{ column: 'owner_id', value: user?.id }],
    orderBy: { column: 'created_at', ascending: false }
  })

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">Error loading properties: {error.message}</div>
  }

  if (!properties?.length) {
    return (
      <div className="text-muted-foreground py-8 text-center">No properties found. Add your first property to get started.</div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
