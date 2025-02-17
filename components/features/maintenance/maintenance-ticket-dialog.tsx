'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
  FormHelperText,
  useTheme
} from '@mui/material'
import { type Property, MaintenancePriority, type NewMaintenanceRequest, type PropertyUnit } from '@/types'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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

export function MaintenanceTicketDialog({ open, onOpenChangeAction, onSubmitAction, properties }: MaintenanceTicketDialogProps) {
  const theme = useTheme()
  const [selectedProperty, setSelectedProperty] = useState('')

  const {
    control,
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

  const handleClose = () => {
    reset()
    onOpenChangeAction(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
      <DialogTitle>New Maintenance Request</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <Controller
              name="property_id"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.property_id} size="small">
                  <InputLabel>Property</InputLabel>
                  <Select
                    {...field}
                    label="Property"
                    onChange={e => {
                      field.onChange(e)
                      setSelectedProperty(e.target.value)
                    }}
                  >
                    {properties.map(property => (
                      <MenuItem key={property.id} value={property.id}>
                        {property.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.property_id && <FormHelperText>{errors.property_id.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="unit_id"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.unit_id} size="small">
                  <InputLabel>Unit</InputLabel>
                  <Select {...field} label="Unit" disabled={!watchPropertyId}>
                    {selectedPropertyUnits.map(unit => (
                      <MenuItem key={unit.id} value={unit.id}>
                        Unit {unit.number}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.unit_id && <FormHelperText>{errors.unit_id.message}</FormHelperText>}
                </FormControl>
              )}
            />

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  placeholder="Brief description of the issue"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  size="small"
                  fullWidth
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  placeholder="Detailed description of the maintenance issue"
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  size="small"
                  fullWidth
                />
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl error={!!errors.priority} size="small">
                  <InputLabel>Priority</InputLabel>
                  <Select {...field} label="Priority">
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="urgent">Urgent</MenuItem>
                  </Select>
                  {errors.priority && <FormHelperText>{errors.priority.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Request'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
