'use client'

import { PRIORITY_LABELS, PRIORITY_LEVELS } from '@/auth/lib/constants'
import { Button } from '@/components/button'
import type { MaintenanceRequest, NewMaintenanceRequest, UpdateMaintenanceRequest } from '@/types/maintenance_requests'
import type { Property } from '@/types/property'
import type { SelectChangeEvent } from '@mui/material'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Select, SelectItem } from '@/components/core/select'
import Textarea from '@/components/core/textarea'
import { useState } from 'react'

interface MaintenanceRequestDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  request?: MaintenanceRequest
  properties: Property[]
  onSubmitAction: (data: NewMaintenanceRequest) => Promise<void>
}

interface MaintenanceRequestEditDialogProps extends Omit<MaintenanceRequestDialogProps, 'onSubmitAction'> {
  request: MaintenanceRequest
  onSubmitAction: (data: UpdateMaintenanceRequest) => Promise<void>
}

export function MaintenanceRequestDialog(props: MaintenanceRequestDialogProps | MaintenanceRequestEditDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(props.request?.propertyId || '')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        propertyId: formData.get('propertyId') as string,
        unitId: formData.get('unitId') as string,
        tenantId: formData.get('tenantId') as string,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        priority: formData.get('priority') as keyof typeof PRIORITY_LEVELS
      }

      if (props.request) {
        await (props as MaintenanceRequestEditDialogProps).onSubmitAction({
          ...data,
          id: props.request.id
        })
      } else {
        await (props as MaintenanceRequestDialogProps).onSubmitAction(data as NewMaintenanceRequest)
      }
      props.onOpenChangeAction(false)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPropertyUnits = props.properties.find(p => p.id === selectedProperty)?.units || []

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.request ? 'Edit Maintenance Request' : 'New Maintenance Request'}</DialogTitle>
          <DialogDescription>
            {props.request ? 'Update the maintenance request details below.' : 'Submit a new maintenance request.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="propertyId">Property</Label>
              <Select
                name="propertyId"
                defaultValue={props.request?.propertyId}
                onChange={(event: SelectChangeEvent<unknown>) => {
                  setSelectedProperty(event.target.value as string)
                }}
                placeholder="Select a property"
              >
                {props.properties.map(property => (
                  <SelectItem key={property.id} value={property.id}>
                    {property.name}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="unitId">Unit</Label>
              <Select name="unitId" defaultValue={props.request?.unitId} disabled={!selectedProperty} placeholder="Select a unit">
                {selectedPropertyUnits.map(unit => (
                  <SelectItem key={unit.id} value={unit.id}>
                    Unit {unit.number}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={props.request?.title} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" defaultValue={props.request?.description} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select name="priority" defaultValue={props.request?.priority} placeholder="Select priority level">
                {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {PRIORITY_LABELS[key as keyof typeof PRIORITY_LEVELS]}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : props.request ? 'Save Changes' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
