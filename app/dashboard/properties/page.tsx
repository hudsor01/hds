'use client'

import { PropertyDialog } from "@/components/dialogs/property-dialog"
import { Button } from "@/components/ui/button"
import { Property } from "@/lib/types/properties"
import { useState } from "react"
import { Edit, Plus, Trash } from "react-feather"

// Mock data for initial development
const mockProperties: Property[] = [
  {
    id: "1",
    name: "Sunset Apartments",
    address: "123 Sunset Blvd",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90028",
    type: "apartment",
    status: "active",
    units: [
      {
        id: "101",
        number: "101",
        bedrooms: 2,
        bathrooms: 1,
        sqft: 800,
        rent: 2000,
        status: "occupied"
      },
      {
        id: "102",
        number: "102",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 600,
        rent: 1500,
        status: "vacant"
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    // In a real app, this would be an API call
    const newProperty: Property = {
      ...propertyData,
      id: Math.random().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setProperties([...properties, newProperty])
  }

  const handleEditProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedProperty) return

    // In a real app, this would be an API call
    const updatedProperty: Property = {
      ...propertyData,
      id: selectedProperty.id,
      createdAt: selectedProperty.createdAt,
      updatedAt: new Date()
    }

    setProperties(properties.map(p =>
      p.id === selectedProperty.id ? updatedProperty : p
    ))
  }

  const handleDeleteProperty = async (propertyId: string) => {
    // In a real app, this would be an API call
    if (confirm('Are you sure you want to delete this property?')) {
      setProperties(properties.filter(p => p.id !== propertyId))
    }
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

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Address</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Units</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties.map(property => (
                <tr key={property.id}>
                  <td className="px-6 py-4">{property.name}</td>
                  <td className="px-6 py-4">
                    {property.address}, {property.city}, {property.state} {property.zipCode}
                  </td>
                  <td className="px-6 py-4 capitalize">{property.type}</td>
                  <td className="px-6 py-4">{property.units.length} units</td>
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

      <PropertyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        property={selectedProperty}
        onSubmit={selectedProperty ? handleEditProperty : handleAddProperty}
      />
    </div>
  )
}
