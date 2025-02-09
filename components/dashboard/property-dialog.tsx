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
} from '@mui/material'
import { useState } from 'react'
import { PROPERTY_TYPES, PROPERTY_STATUS, type PropertyType, type PropertyStatus } from '@/types/property'
import type { PropertyInsert } from '@/types/property'

interface PropertyDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  onSubmitAction: (data: PropertyInsert) => Promise<void>
  property?: PropertyInsert | null
}

export function PropertyDialog({
  open,
  onOpenChangeAction,
  onSubmitAction,
  property,
}: PropertyDialogProps) {
  const [formData, setFormData] = useState<Omit<PropertyInsert, 'id' | 'created_at' | 'updated_at' | 'user_id'>>({
    name: property?.name || '',
    address: property?.address || '',
    city: property?.city || '',
    state: property?.state || '',
    zip: property?.zip || '',
    property_type: (property?.property_type || 'apartment') as PropertyType,
    property_status: (property?.property_status || 'active') as PropertyStatus,
    rent_amount: property?.rent_amount || 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmitAction({
      ...formData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: '',
    })
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      property_type: 'apartment',
      property_status: 'active',
      rent_amount: 0,
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
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              required
              size="small"
            />
            <TextField
              fullWidth
              label="State"
              value={formData.state}
              onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
              required
              size="small"
            />
          </Box>
          <TextField
            fullWidth
            label="ZIP Code"
            value={formData.zip}
            onChange={(e) => setFormData((prev) => ({ ...prev, zip: e.target.value }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Monthly Rent"
            type="number"
            value={formData.rent_amount}
            onChange={(e) => setFormData((prev) => ({ ...prev, rent_amount: Number(e.target.value) }))}
            required
            size="small"
            sx={{ mb: 2 }}
          />
          <Select
            fullWidth
            label="Property Type"
            value={formData.property_type}
            onChange={(e) => setFormData((prev) => ({ ...prev, property_type: e.target.value as PropertyType }))}
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
            value={formData.property_status}
            onChange={(e) => setFormData((prev) => ({ ...prev, property_status: e.target.value as PropertyStatus }))}
            required
            size="small"
            sx={{ mb: 2 }}
          >
            {Object.entries(PROPERTY_STATUS).map(([key, value]) => (
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
