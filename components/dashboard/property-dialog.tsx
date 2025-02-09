'use client'

import { Button } from '@/components/ui/buttons/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import type { Property, PropertyType, PropertyStatus } from '@/types/property'

const PROPERTY_TYPES = {
  SINGLE_FAMILY: 'SINGLE_FAMILY',
  MULTI_FAMILY: 'MULTI_FAMILY',
  APARTMENT: 'APARTMENT',
  CONDO: 'CONDO',
} as const

const PROPERTY_STATUSES = {
  AVAILABLE: 'AVAILABLE',
  RENTED: 'RENTED',
  MAINTENANCE: 'MAINTENANCE',
  INACTIVE: 'INACTIVE',
} as const

interface PropertyDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSubmitAction: (data: Omit<Property, 'id' | 'units'>) => Promise<void>
  property?: Property | null
}

export function PropertyDialog({
  open,
  onOpenChangeAction,
  onSubmitAction,
  property,
}: PropertyDialogProps) {
  const [formData, setFormData] = useState({
    name: property?.name || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zipCode: property?.zipCode || '',
    type: (property?.type || PROPERTY_TYPES.SINGLE_FAMILY) as PropertyType,
    status: (property?.status || PROPERTY_STATUSES.AVAILABLE) as PropertyStatus,
    price: property?.price || 0,
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    image: property?.image || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmitAction(formData)
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      type: PROPERTY_TYPES.SINGLE_FAMILY as PropertyType,
      status: PROPERTY_STATUSES.AVAILABLE as PropertyStatus,
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
      image: '',
    })
  }

  return (
    <Dialog open={open} onClose={() => onOpenChangeAction(false)}>
      <DialogContent>
        <Box mb={2}>
          <DialogTitle>{property ? 'Edit Property' : 'Add New Property'}</DialogTitle>
        </Box>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Property Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="State"
            value={formData.state}
            onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Zip Code"
            value={formData.zipCode}
            onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: Number(e.target.value) }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Bathrooms"
            type="number"
            value={formData.bathrooms}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bathrooms: Number(e.target.value) }))
            }
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            label="Property Type"
            value={formData.type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, type: e.target.value as PropertyType }))
            }
            required
            size="small"
            sx={{ mb: 2 }}
          >
            {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </Select>
          <Select
            fullWidth
            label="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, status: e.target.value as PropertyStatus }))
            }
            required
            size="small"
            sx={{ mb: 2 }}
          >
            {Object.entries(PROPERTY_STATUSES).map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key.replace(/_/g, ' ')}
              </MenuItem>
            ))}
          </Select>
          <Box display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outline" onClick={() => onOpenChangeAction(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default">
              {property ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}
