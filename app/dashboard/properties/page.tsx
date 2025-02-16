'use client'

import { useState } from 'react'
import { PropertyForm } from '@/components/properties/property-form'
import { PropertyTable } from '@/components/properties/property-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Property, CreatePropertyInput } from '@/types/property'
import { useToast } from '@/components/ui/use-toast'
import { supabaseClient } from '@/lib/supabase'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const { toast } = useToast()

  // Fetch properties
  const fetchProperties = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabaseClient
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setProperties(data)
    } catch (error) {
      console.error('Error fetching properties:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch properties. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Create property
  const handleCreate = async (data: CreatePropertyInput) => {
    try {
      const { data: newProperty, error } = await supabaseClient
        .from('properties')
        .insert([data])
        .select()
        .single()

      if (error) throw error

      setProperties((prev) => [newProperty, ...prev])
      setIsDialogOpen(false)
      toast({
        title: 'Success',
        description: 'Property created successfully.',
      })
    } catch (error) {
      console.error('Error creating property:', error)
      toast({
        title: 'Error',
        description: 'Failed to create property. Please try again.',
        variant: 'destructive',
      })
    }
  }

  // Update property
  const handleUpdate = async (data: CreatePropertyInput) => {
    if (!selectedProperty) return

    try {
      const { data: updatedProperty, error } = await supabaseClient
        .from('properties')
        .update(data)
        .eq('id', selectedProperty.id)
        .select()
        .single()

      if (error) throw error

      setProperties((prev) =>
        prev.map((p) => (p.id === selectedProperty.id ? updatedProperty : p))
      )
      setIsDialogOpen(false)
      setSelectedProperty(null)
      toast({
        title: 'Success',
        description: 'Property updated successfully.',
      })
    } catch (error) {
      console.error('Error updating property:', error)
      toast({
        title: 'Error',
        description: 'Failed to update property. Please try again.',
        variant: 'destructive',
      })
    }
  }

  // Delete property
  const handleDelete = async (propertyId: string) => {
    try {
      const { error } = await supabaseClient
        .from('properties')
        .delete()
        .eq('id', propertyId)

      if (error) throw error

      setProperties((prev) => prev.filter((p) => p.id !== propertyId))
      toast({
        title: 'Success',
        description: 'Property deleted successfully.',
      })
    } catch (error) {
      console.error('Error deleting property:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete property. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <PropertyTable
          properties={properties}
          onEdit={(property) => {
            setSelectedProperty(property)
            setIsDialogOpen(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) setSelectedProperty(null)
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedProperty ? 'Edit Property' : 'Add Property'}
            </DialogTitle>
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