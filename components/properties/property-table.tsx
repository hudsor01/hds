import { BaseDataGrid } from '@/components/common/data-grid'
import { formatCurrency } from '@/utils/format'
import { type PropertyRow, type PropertyTableProps } from '@/types/property'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import {
  type GridColDef,
  type GridRenderCellParams,
  type GridValueGetterParams,
} from '@mui/x-data-grid'

export function PropertyTable({ properties, isLoading }: PropertyTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Property',
      width: 250,
      renderCell: (params: GridRenderCellParams<PropertyRow>) => (
        <Box>
          <Typography variant="body2" component="div">
            {params.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.address}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'property_status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams<PropertyRow>) => (
        <Chip
          label={params.value}
          color={
            params.value === 'active'
              ? 'success'
              : params.value === 'inactive'
                ? 'error'
                : 'warning'
          }
          size="small"
        />
      ),
    },
    {
      field: 'rent_amount',
      headerName: 'Rent',
      width: 130,
      valueFormatter: ({ value }: { value: number }) => formatCurrency(value),
    },
    {
      field: 'tenants',
      headerName: 'Tenants',
      width: 130,
      valueGetter: (params: GridValueGetterParams<PropertyRow>) => params.row.tenants?.length || 0,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: () => (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ]

  return <BaseDataGrid data={properties} columns={columns} isLoading={isLoading} pageSize={10} />
}
