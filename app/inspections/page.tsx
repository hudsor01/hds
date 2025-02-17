'use client'

import { DataTable, renderDateCell, renderStatusCell } from '@/components/data-table'
import { FormDialog } from '@/components/dialogs/form-dialog'
import { api } from '@/lib/api'
import { Button, TextField } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Plus } from 'react-feather'
import { z } from 'zod'

const inspectionSchema = z.object({
  property_id: z.string().uuid('Invalid property ID'),
  inspection_type: z.enum(['ROUTINE', 'MOVE_IN', 'MOVE_OUT', 'MAINTENANCE']),
  scheduled_date: z.string().datetime(),
  inspector_name: z.string().min(1, 'Inspector name is required'),
  notes: z.string().optional()
})

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'inspection_type', headerName: 'Type', width: 150 },
  {
    field: 'status',
    headerName: 'Status',
    width: 120,
    renderCell: renderStatusCell
  },
  { field: 'inspector_name', headerName: 'Inspector', width: 150 },
  {
    field: 'scheduled_date',
    headerName: 'Scheduled Date',
    width: 200,
    renderCell: renderDateCell
  },
  {
    field: 'completed_date',
    headerName: 'Completed Date',
    width: 200,
    renderCell: renderDateCell
  },
  { field: 'notes', headerName: 'Notes', width: 200 }
]

export default function InspectionsPage() {
  const [open, setOpen] = useState(false)
  const [selectedInspection, setSelectedInspection] = useState<unknown>(null)
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10
  })

  const { data, isLoading } = useQuery({
    queryKey: ['inspections', paginationModel],
    queryFn: () => api.get('/api/inspections')
  })

  const handleEdit = (inspection: unknown) => {
    setSelectedInspection(inspection)
    setOpen(true)
  }

  const handleDelete = async (inspection: unknown) => {
    if (window.confirm('Are you sure you want to delete this inspection?')) {
      try {
        await api.delete(`/api/inspections`, inspection.id)
        // Refresh data
      } catch (error) {
        console.error('Error deleting inspection:', error)
      }
    }
  }

  const handleSubmit = async (formData: unknown) => {
    try {
      if (selectedInspection) {
        await api.put(`/api/inspections`, selectedInspection.id, formData)
      } else {
        await api.post('/api/inspections', formData)
      }
      setOpen(false)
      setSelectedInspection(null)
      // Refresh data
    } catch (error) {
      console.error('Error saving inspection:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Inspections</h1>
        <Button
          variant="contained"
          startIcon={<Plus size={20} />}
          onClick={() => {
            setOpen(true)
          }}
          sx={{
            background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
            }
          }}
        >
          New Inspection
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
          setSelectedInspection(null)
        }}
        onSubmit={handleSubmit}
        title={selectedInspection ? 'Edit Inspection' : 'New Inspection'}
      >
        <div className="grid gap-4">
          <TextField
            label="Property"
            select
            fullWidth
            required
            // Add property options
          />
          <TextField
            label="Inspection Type"
            select
            fullWidth
            required
            // Add inspection type options
          />
          <TextField label="Scheduled Date" type="datetime-local" fullWidth required InputLabelProps={{ shrink: true }} />
          <TextField label="Inspector Name" fullWidth required />
          <TextField label="Notes" fullWidth multiline rows={4} />
        </div>
      </FormDialog>
    </div>
  )
}
