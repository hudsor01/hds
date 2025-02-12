'use client'

import {
  DataTable,
  renderCurrencyCell,
  renderStatusCell
} from '@/components/data-display/data-table'
import { FormDialog } from '@/components/ui/dialogs/form-dialog'
import { api } from '@/lib/api'
import { Button, Chip, TextField } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Plus } from 'react-feather'
import { z } from 'zod'

const vendorSchema = z.object({
  company_name: z.string().min(1, 'Company name is required'),
  contact_name: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  address: z.string().optional(),
  services: z.array(z.string()).min(1, 'At least one service must be specified'),
  rate: z.number().positive('Rate must be positive').optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).default('ACTIVE')
})

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'company_name', headerName: 'Company Name', width: 200 },
  { field: 'contact_name', headerName: 'Contact Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  {
    field: 'services',
    headerName: 'Services',
    width: 300,
    renderCell: params => (
      <div className="flex gap-1 overflow-x-auto">
        {params.value.map((service: string) => (
          <Chip key={service} label={service} size="small" />
        ))}
      </div>
    )
  },
  {
    field: 'rate',
    headerName: 'Rate',
    width: 120,
    renderCell: renderCurrencyCell
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: renderStatusCell
  }
]

const serviceOptions = [
  'Plumbing',
  'Electrical',
  'HVAC',
  'Landscaping',
  'Cleaning',
  'Painting',
  'Carpentry',
  'Roofing',
  'General Maintenance'
]

export default function VendorsPage() {
  const [open, setOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['vendors', paginationModel],
    queryFn: () => api.get('/api/vendors')
  })

  const handleEdit = (vendor: any) => {
    setSelectedVendor(vendor)
    setOpen(true)
  }

  const handleDelete = async (vendor: any) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        await api.delete(`/api/vendors`, vendor.id)
        // Refresh data
      } catch (error) {
        console.error('Error deleting vendor:', error)
      }
    }
  }

  const handleSubmit = async (formData: any) => {
    try {
      if (selectedVendor) {
        await api.put(`/api/vendors`, selectedVendor.id, formData)
      } else {
        await api.post('/api/vendors', formData)
      }
      setOpen(false)
      setSelectedVendor(null)
      // Refresh data
    } catch (error) {
      console.error('Error saving vendor:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Vendors</h1>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => setOpen(true)}
          sx={{
            background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
            }
          }}
        >
          New Vendor
        </Button>
      </div>

      <DataTable
        columns={columns}
        rows={data?.data || []}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={data?.total || 0}
      />

      <FormDialog
        open={open}
        onClose={() => {
          setOpen(false)
          setSelectedVendor(null)
        }}
        onSubmit={handleSubmit}
        title={selectedVendor ? 'Edit Vendor' : 'New Vendor'}
      >
        <div className="grid gap-4">
          <TextField label="Company Name" fullWidth required />
          <TextField label="Contact Name" fullWidth required />
          <TextField label="Email" type="email" fullWidth required />
          <TextField label="Phone" fullWidth required />
          <TextField label="Address" fullWidth />
          <TextField
            label="Services"
            select
            fullWidth
            required
            SelectProps={{ multiple: true }}
            // Add service options
          />
          <TextField label="Rate (per hour)" type="number" fullWidth />
          <TextField
            label="Status"
            select
            fullWidth
            required
            // Add status options
          />
        </div>
      </FormDialog>
    </div>
  )
}
