'use client'

import { PropertyDialog } from "@/components/dialogs/property-dialog"
import { Button } from "@/components/ui/button"
import { Property } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Edit, Plus, Trash } from "react-feather"
import { toast } from "sonner"

type PropertyFormData = Omit<Property, 'id' | 'created_at' | 'owner_id' | 'organization_id'>

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties')
      if (!response.ok) throw new Error('Failed to fetch properties')
      const data = await response.json()
      setProperties(data)
    } catch (error) {
      toast.error('Error loading properties')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProperty = async (propertyData: PropertyFormData) => {
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      })

      if (!response.ok) throw new Error('Failed to create property')

      const newProperty = await response.json()
      setProperties([newProperty, ...properties])
      toast.success('Property created successfully')
    } catch (error) {
      toast.error('Error creating property')
      console.error('Error:', error)
    }
  }

  const handleEditProperty = async (propertyData: PropertyFormData) => {
    if (!selectedProperty) return

    try {
      const response = await fetch(`/api/properties/${selectedProperty.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(propertyData),
      })

      if (!response.ok) throw new Error('Failed to update property')

      const updatedProperty = await response.json()
      setProperties(properties.map(p =>
        p.id === selectedProperty.id ? updatedProperty : p
      ))
      toast.success('Property updated successfully')
    } catch (error) {
      toast.error('Error updating property')
      console.error('Error:', error)
    }
  }

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete property')

      setProperties(properties.filter(p => p.id !== propertyId))
      toast.success('Property deleted successfully')
    } catch (error) {
      toast.error('Error deleting property')
      console.error('Error:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Properties</h1>
          <p className="text-gray-500">Manage your property portfolio</p>
        </div>
        <Button onClick={() => {
          setSelectedProperty(undefined)
          setIsDialogOpen(true)
        }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No properties yet</h3>
          <p className="mt-2 text-sm text-gray-500">Get started by adding your first property.</p>
          <div className="mt-6">
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Address</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Type</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {properties.map(property => (
                  <tr key={property.id}>
                    <td className="px-6 py-4">{property.name}</td>
                    <td className="px-6 py-4">
                      {property.address}, {property.city}, {property.state} {property.zip_code}
                    </td>
                    <td className="px-6 py-4 capitalize">{property.type}</td>
                    <td className="px-6 py-4 capitalize">{property.status}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedProperty(property)
                            setIsDialogOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PropertyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        property={selectedProperty}
        onSubmit={selectedProperty ? handleEditProperty : handleAddProperty}
      />
    </div>
  )
}
