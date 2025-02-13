'use client'

import { Button } from '@/components/ui/buttons/button'
import { Property, MaintenancePriority, NewMaintenanceRequest, PropertyUnit } from '@/types'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Label } from '@/components/ui/label'
import { Select, SelectItem } from '@/components/ui/select'
import Textarea from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const maintenanceSchema = z.object({
  property_id: z.string().min(1, 'Property is required'),
  unit_id: z.string().min(1, 'Unit is required'),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  priority: z.enum(['low', 'medium', 'high', 'urgent'] as const)
})

type MaintenanceFormData = z.infer<typeof maintenanceSchema>

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
  const [selectedProperty, setSelectedProperty] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm<MaintenanceFormData>({
    resolver: zodResolver(maintenanceSchema)
  })

  const selectedPropertyUnits = properties.find(p => p.id === selectedProperty)?.units || []
  const watchPropertyId = watch('property_id')

  const onSubmit = async (data: MaintenanceFormData) => {
    try {
      await onSubmitAction(data)
      reset()
      onOpenChangeAction(false)
    } catch (error) {
      console.error('Failed to create maintenance request:', error)
    }
  }

  const handleSelectProperty = (value: string) => {
    setSelectedProperty(value)
  }

  return (
    <Dialog open={open} onClose={() => onOpenChangeAction(false)} maxWidth="md" fullWidth>
      <DialogTitle>New Maintenance Request</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="property_id">Property</Label>
              <Select
                {...register('property_id')}
                value={selectedProperty}
                onChange={e => {
                  const value = e.target.value
                  handleSelectProperty(value)
                }}
                error={!!errors.property_id}
              >
                <SelectItem value="">Select a property</SelectItem>
                {properties.map(property => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </Select>
              {errors.property_id && (
                <p className="text-sm text-red-500">{errors.property_id.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit_id">Unit</Label>
              <Select {...register('unit_id')} disabled={!watchPropertyId} error={!!errors.unit_id}>
                <SelectItem value="">Select a unit</SelectItem>
                {selectedPropertyUnits.map(unit => (
                  <SelectItem key={unit.id} value={unit.id}>
                    Unit {unit.number}
                  </SelectItem>
                ))}
              </Select>
              {errors.unit_id && <p className="text-sm text-red-500">{errors.unit_id.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                {...register('title')}
                placeholder="Brief description of the issue"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register('description')}
                placeholder="Detailed description of the maintenance issue"
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select {...register('priority')} error={!!errors.priority}>
                <SelectItem value="">Select priority level</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </Select>
              {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                onOpenChangeAction(false)
              }}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
