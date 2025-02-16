'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/dialog'
import { PropertyForm, PropertyTable } from '@/components/properties'
import { type Property, type CreatePropertyInput } from '@/types/property'
import { useToast } from '@/hooks/use-toast'
import { createClient } from '@/utils/supabase/client'
import { Skeleton } from '@mui/material'
import { Add } from '@mui/icons-material'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchProperties()
  }, [])

  async function fetchProperties() {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false })

      if (error) throw error

      setProperties(data || [])
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch properties. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreate(data: CreatePropertyInput) {
    try {
      const { data: newProperty, error } = await supabase.from('properties').insert([data]).select().single()

      if (error) throw error

      setProperties(prev => [newProperty, ...prev])
      setIsDialogOpen(false)
      toast({
        title: 'Success',
        description: 'Property created successfully.'
      })
    } catch (error) {
      console.error('Error creating property:', error)
      toast({
        title: 'Error',
        description: 'Failed to create property. Please try again.',
        variant: 'destructive'
      })
    }
  }

  async function handleUpdate(data: CreatePropertyInput) {
    if (!selectedProperty) return

    try {
      const { data: updatedProperty, error } = await supabase
        .from('properties')
        .update(data)
        .eq('id', selectedProperty.id)
        .select()
        .single()

      if (error) throw error

      setProperties(prev => prev.map(p => (p.id === selectedProperty.id ? updatedProperty : p)))
      setIsDialogOpen(false)
      setSelectedProperty(null)
      toast({
        title: 'Success',
        description: 'Property updated successfully.'
      })
    } catch (error) {
      console.error('Error updating property:', error)
      toast({
        title: 'Error',
        description: 'Failed to update property. Please try again.',
        variant: 'destructive'
      })
    }
  }

  async function handleDelete(propertyId: string) {
    try {
      const { error } = await supabase.from('properties').delete().eq('id', propertyId)

      if (error) throw error

      setProperties(prev => prev.filter(p => p.id !== propertyId))
      toast({
        title: 'Success',
        description: 'Property deleted successfully.'
      })
    } catch (error) {
      console.error('Error deleting property:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete property. Please try again.',
        variant: 'destructive'
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width={120} height={40} />
          <Skeleton variant="rounded" width={150} height={40} />
        </div>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" height={64} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Add fontSize="small" className="mr-2" />
          Add Property
        </Button>
      </div>

      <PropertyTable
        properties={properties}
        onEdit={property => {
          setSelectedProperty(property)
          setIsDialogOpen(true)
        }}
        onDelete={handleDelete}
      />

      <Dialog
        open={isDialogOpen}
        onOpenChange={open => {
          setIsDialogOpen(open)
          if (!open) setSelectedProperty(null)
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProperty ? 'Edit Property' : 'Add Property'}</DialogTitle>
            <DialogDescription>
              {selectedProperty
                ? 'Update the property details below.'
                : 'Fill in the property details below to add a new property.'}
            </DialogDescription>
          </DialogHeader>
          <PropertyForm
            initialData={selectedProperty || undefined}
            onSubmit={selectedProperty ? handleUpdate : handleCreate}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
