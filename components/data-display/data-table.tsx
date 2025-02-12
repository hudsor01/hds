import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@mui/material'
import {
  DataGrid,
  type GridColDef,
  type GridFilterModel,
  type GridPaginationModel,
  type GridSortModel
} from '@mui/x-data-grid'
import { Edit, Trash } from 'react-feather'

interface DataTableProps {
  columns: GridColDef[]
  rows: any[]
  loading?: boolean
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  onSortModelChange?: (model: GridSortModel) => void
  onFilterModelChange?: (model: GridFilterModel) => void
  onPaginationModelChange?: (model: GridPaginationModel) => void
  paginationModel?: GridPaginationModel
  rowCount?: number
}

export function DataTable({
  columns,
  rows,
  loading = false,
  onEdit,
  onDelete,
  onSortModelChange,
  onFilterModelChange,
  onPaginationModelChange,
  paginationModel,
  rowCount
}: DataTableProps) {
  const columnsWithActions: GridColDef[] = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: params => (
        <div className="flex gap-2">
          {onEdit && (
            <Button
              size="small"
              onClick={() => onEdit(params.row)}
              sx={{ minWidth: 'auto', padding: '4px' }}
            >
              <Edit size={16} />
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              color="error"
              onClick={() => onDelete(params.row)}
              sx={{ minWidth: 'auto', padding: '4px' }}
            >
              <Trash size={16} />
            </Button>
          )}
        </div>
      )
    }
  ]

  return (
    <div className="h-[600px] w-full">
      <DataGrid
        rows={rows}
        columns={columnsWithActions}
        loading={loading}
        onSortModelChange={onSortModelChange}
        onFilterModelChange={onFilterModelChange}
        onPaginationModelChange={onPaginationModelChange}
        paginationModel={paginationModel}
        rowCount={rowCount}
        pageSizeOptions={[10, 25, 50]}
        paginationMode="server"
        sortingMode="server"
        filterMode="server"
        disableRowSelectionOnClick
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-cell': {
            padding: '8px'
          }
        }}
      />
    </div>
  )
}

// Helper function to render status badges in table cells
export const renderStatusCell = (params: any) => {
  return <StatusBadge status={params.value.toLowerCase()} />
}

// Helper function to render currency values
export const renderCurrencyCell = (params: any) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(params.value)
}

// Helper function to render dates
export const renderDateCell = (params: any) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(params.value))
}
