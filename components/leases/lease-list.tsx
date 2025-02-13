import { LeaseActions } from './lease-actions'
import { useLeases } from '@/hooks/use-leases'
import { formatCurrency } from '@/lib/utils'
import type { Lease } from '@/types'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { ErrorBoundary } from '@/components/error/error-boundary'

export function LeaseList() {
  const { data: leases, isLoading, error } = useLeases()

  const columns: GridColDef<Lease>[] = [
    {
      field: 'propertyId',
      headerName: 'Property',
      width: 200,
      valueGetter: ({ row }: { row: Lease }) => row.propertyName || 'N/A'
    },
    {
      field: 'tenantId',
      headerName: 'Tenant',
      width: 200,
      valueGetter: ({ row }: { row: Lease }) => row.tenantName || 'N/A'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams<Lease>) => (
        <Chip
          label={params.value}
          color={
            params.value === 'active'
              ? 'success'
              : params.value === 'pending'
                ? 'warning'
                : params.value === 'expired'
                  ? 'error'
                  : 'default'
          }
          size="small"
        />
      )
    },
    {
      field: 'rentAmount',
      headerName: 'Rent',
      width: 130,
      valueFormatter: ({ value }) => formatCurrency(value as number)
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      valueFormatter: ({ value }) => format(new Date(value as string), 'MM/dd/yyyy')
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 130,
      valueFormatter: ({ value }) => format(new Date(value as string), 'MM/dd/yyyy')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Lease>) => (
        <LeaseActions leaseId={params.row.id} leaseStatus={params.row.status} />
      )
    }
  ]

  if (error) {
    return <div>Error loading leases: {error.message}</div>
  }

  return (
    <ErrorBoundary>
      <Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<AddIcon />} href="/leases/new">
            Create Lease
          </Button>
        </Box>

        <DataGrid<Lease>
          rows={leases || []}
          columns={columns}
          loading={isLoading}
          autoHeight
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }
            },
            sorting: {
              sortModel: [{ field: 'startDate', sort: 'desc' }]
            }
          }}
          getRowId={row => row.id}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: 'none'
            }
          }}
        />
      </Box>
    </ErrorBoundary>
  )
}
