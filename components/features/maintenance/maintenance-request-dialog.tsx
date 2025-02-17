'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  MenuItem,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'
import { PRIORITY_LABELS, PRIORITY_LEVELS } from '@/lib/constants'
import type { MaintenanceRequest, NewMaintenanceRequest, UpdateMaintenanceRequest } from '@/types/maintenance_requests'
import type { Property } from '@/types/property'

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
  const theme = useTheme()
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
    <Dialog
      open={props.open}
      onClose={() => {
        props.onOpenChangeAction(false)
      }}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`
        }
      }}
    >
      <DialogTitle>{props.request ? 'Edit Maintenance Request' : 'New Maintenance Request'}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {props.request ? 'Update the maintenance request details below.' : 'Submit a new maintenance request.'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="property-label">Property</InputLabel>
            <Select
              labelId="property-label"
              name="propertyId"
              label="Property"
              defaultValue={props.request?.propertyId}
              onChange={(event: SelectChangeEvent) => {
                setSelectedProperty(event.target.value)
              }}
            >
              {props.properties.map(property => (
                <MenuItem key={property.id} value={property.id}>
                  {property.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="unit-label">Unit</InputLabel>
            <Select
              labelId="unit-label"
              name="unitId"
              label="Unit"
              defaultValue={props.request?.unitId}
              disabled={!selectedProperty}
            >
              {selectedPropertyUnits.map(unit => (
                <MenuItem key={unit.id} value={unit.id}>
                  Unit {unit.number}
                </MenuItem>
              ))}
            </Select>
            {!selectedProperty && <FormHelperText>Select a property first</FormHelperText>}
          </FormControl>

          <TextField name="title" label="Title" defaultValue={props.request?.title} required size="small" fullWidth />

          <TextField
            name="description"
            label="Description"
            defaultValue={props.request?.description}
            required
            multiline
            rows={4}
            size="small"
            fullWidth
          />

          <FormControl fullWidth size="small">
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select labelId="priority-label" name="priority" label="Priority" defaultValue={props.request?.priority}>
              {Object.entries(PRIORITY_LEVELS).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {PRIORITY_LABELS[key as keyof typeof PRIORITY_LEVELS]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={() => {
            props.onOpenChangeAction(false)
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Saving...' : props.request ? 'Save Changes' : 'Submit Request'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
