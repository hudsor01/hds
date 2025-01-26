'use client'

import { PROPERTY_STATUS, PROPERTY_TYPES } from "@/auth/lib/constants"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import type { Property, PropertyStatus } from "@/types/properties"
import { useState } from "react"

interface PropertyDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  property?: Property
  onSubmitAction: (property: Omit<Property, 'id' | 'created_at' | 'owner_id' | 'organization_id'>) => Promise<void>
}

export function PropertyDialog({ open, onOpenChangeAction, property, onSubmitAction }: PropertyDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const propertyData = {
        name: formData.get("name") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipCode: formData.get("zipCode") as string,
        type: formData.get("type") as keyof typeof PROPERTY_TYPES,
        status: (formData.get("status") === 'active' ? 'available' :
                formData.get("status") === 'inactive' ? 'inactive' :
                formData.get("status") === 'maintenance' ? 'maintenance' : 'available') as PropertyStatus,
        units: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await onSubmitAction(propertyData)
      onOpenChangeAction(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save property")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{property ? 'Edit Property' : 'Add Property'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={property?.name}
              required
              placeholder="Enter property name"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={property?.address}
              required
              placeholder="Enter street address"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                name="city"
                defaultValue={property?.city}
                required
                placeholder="Enter city"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                name="state"
                defaultValue={property?.state}
                required
                placeholder="Enter state"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              name="zipCode"
              defaultValue={property?.zipCode}
              required
              placeholder="Enter ZIP code"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Property Type</Label>
              <Select
                name="type"
                defaultValue={property?.type}
                required
              >
                {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                name="status"
                defaultValue={property?.status}
                required
              >
                {Object.entries(PROPERTY_STATUS).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChangeAction(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : property ? 'Save Changes' : 'Add Property'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
