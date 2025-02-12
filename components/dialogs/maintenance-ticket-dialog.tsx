'use client'

import { Button } from '@/components/ui/buttons/button'
import { Property, MaintenancePriority, NewMaintenanceRequest, PropertyUnit } from '@/types'
import type { SelectChangeEvent } from '@mui/material'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Label } from '@/components/ui/label'
import { Select, SelectItem } from '@/components/ui/select'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface MaintenanceTicketDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSubmitAction: (data: NewMaintenanceRequest) => Promise<void>
  properties: Array<Property & { units: PropertyUnit[] }>
}

export function MaintenanceTicketDialog({
  open,
  onOpenChangeAction,
  onSubmitAction,
  properties
}: MaintenanceTicketDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data: NewMaintenanceRequest = {
        property_id: formData.get('property_id') as string,
        unit_id: formData.get('unit_id') as string,
        tenant_id: formData.get('tenant_id') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        priority: formData.get('priority') as MaintenancePriority
      }

      await onSubmitAction(data)
      onOpenChangeAction(false)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPropertyUnits = properties.find(p => p.id === selectedProperty)?.units || []

  return (
    <Dialog open={open} onClose={() => onOpenChangeAction(false)} maxWidth="md" fullWidth>
      <DialogTitle>New Maintenance Request</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="property_id">Property</Label>
              <Select
                name="property_id"
                value={selectedProperty}
                onChange={(event: SelectChangeEvent<unknown>) => {
                  const value = event.target.value as string
                  setSelectedProperty(value)
                  setSelectedUnit('')
                }}
                placeholder="Select a property"
              >
                {properties.map(property => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit_id">Unit</Label>
              <Select
                name="unit_id"
                value={selectedUnit}
                onChange={(event: SelectChangeEvent<unknown>) => {
                  setSelectedUnit(event.target.value as string)
                }}
                disabled={!selectedProperty}
                placeholder="Select a unit"
              >
                {selectedPropertyUnits.map((unit: PropertyUnit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    Unit {unit.number}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of the issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of the maintenance issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" placeholder="Select priority level">
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChangeAction(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
