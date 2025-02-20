'use client'

import { Button, TextField } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { z } from 'zod'

const workOrderSchema = z.object({
    vendor_id: z.string().uuid('Invalid vendor ID'),
    property_id: z.string().uuid('Invalid property ID'),
    maintenance_id: z
        .string()
        .uuid('Invalid maintenance request ID')
        .optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    priority: z
        .enum(['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'])
        .default('LOW'),
    status: z
        .enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
        .default('PENDING'),
    scheduled_date: z.string().datetime(),
    completed_date: z.string().datetime().optional(),
    estimated_cost: z
        .number()
        .positive('Estimated cost must be positive')
        .optional(),
    actual_cost: z
        .number()
        .positive('Actual cost must be positive')
        .optional(),
    notes: z.string().optional()
})

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 200 },
    {
        field: 'vendor',
        headerName: 'Vendor',
        width: 200,
        valueGetter: params => params.row.vendor?.compunknown_name
    },
    {
        field: 'property',
        headerName: 'Property',
        width: 200,
        valueGetter: params => params.row.property?.name
    },
    {
        field: 'priority',
        headerName: 'Priority',
        width: 120,
        renderCell: renderStatusCell
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 120,
        renderCell: renderStatusCell
    },
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
    {
        field: 'estimated_cost',
        headerName: 'Est. Cost',
        width: 120,
        renderCell: renderCurrencyCell
    },
    {
        field: 'actual_cost',
        headerName: 'Actual Cost',
        width: 120,
        renderCell: renderCurrencyCell
    }
]

export default function WorkOrdersPage() {
    const [open, setOpen] = useState(false)
    const [selectedWorkOrder, setSelectedWorkOrder] =
        useState<unknown>(null)
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10
    })

    const { data, isLoading } = useQuery({
        queryKey: ['work-orders', paginationModel],
        queryFn: () => api.get('/api/work-orders')
    })

    const { data: vendors } = useQuery({
        queryKey: ['vendors'],
        queryFn: () => api.get('/api/vendors')
    })

    const { data: properties } = useQuery({
        queryKey: ['properties'],
        queryFn: () => api.get('/api/properties')
    })

    const handleEdit = (workOrder: unknown) => {
        setSelectedWorkOrder(workOrder)
        setOpen(true)
    }

    const handleDelete = async (workOrder: unknown) => {
        if (
            window.confirm(
                'Are you sure you want to delete this work order?'
            )
        ) {
            try {
                await api.delete(`/api/work-orders`, workOrder.id)
                // Refresh data
            } catch (error) {
                console.error('Error deleting work order:', error)
            }
        }
    }

    const handleSubmit = async (formData: unknown) => {
        try {
            if (selectedWorkOrder) {
                await api.put(
                    `/api/work-orders`,
                    selectedWorkOrder.id,
                    formData
                )
            } else {
                await api.post('/api/work-orders', formData)
            }
            setOpen(false)
            setSelectedWorkOrder(null)
            // Refresh data
        } catch (error) {
            console.error('Error saving work order:', error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Work Orders</h1>
                <Button
                    variant="contained"
                    startIcon={<Plus size={20} />}
                    onClick={() => {
                        setOpen(true)
                    }}
                    sx={{
                        background:
                            'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                        '&:hover': {
                            background:
                                'linear-gradient(45deg, #0059B2 30%, #004C99 90%)'
                        }
                    }}
                >
                    New Work Order
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
                    setSelectedWorkOrder(null)
                }}
                onSubmit={handleSubmit}
                title={
                    selectedWorkOrder
                        ? 'Edit Work Order'
                        : 'New Work Order'
                }
            >
                <div className="grid gap-4">
                    <TextField label="Title" fullWidth required />
                    <TextField
                        label="Vendor"
                        select
                        fullWidth
                        required
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="">Select a vendor</option>
                        {Array.isArray(vendors?.data) &&
                            vendors.data.map(
                                (vendor: {
                                    id: string
                                    compunknown_name: string
                                }) => (
                                    <option
                                        key={vendor.id}
                                        value={vendor.id}
                                    >
                                        {vendor.compunknown_name}
                                    </option>
                                )
                            )}
                    </TextField>
                    <TextField
                        label="Property"
                        select
                        fullWidth
                        required
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="">Select a property</option>
                        {properties?.data?.map(
                            (property: {
                                id: string
                                name: string
                            }) => (
                                <option
                                    key={property.id}
                                    value={property.id}
                                >
                                    {property.name}
                                </option>
                            )
                        )}
                    </TextField>
                    <TextField
                        label="Priority"
                        select
                        fullWidth
                        required
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="">Select priority</option>
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="EMERGENCY">Emergency</option>
                    </TextField>
                    <TextField
                        label="Status"
                        select
                        fullWidth
                        required
                        SelectProps={{
                            native: true
                        }}
                    >
                        <option value="">Select status</option>
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">
                            In Progress
                        </option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </TextField>
                    <TextField
                        label="Scheduled Date"
                        type="datetime-local"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Completed Date"
                        type="datetime-local"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Estimated Cost"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        label="Actual Cost"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        required
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Notes"
                        fullWidth
                        multiline
                        rows={4}
                    />
                </div>
            </FormDialog>
        </div>
    )
}
