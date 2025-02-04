import {PropertyTableProps} from '../../types/properties';
import {formatCurrency} from '@/lib/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import {
  DataGrid,
  type GridColDef,
  GridToolbar,
  type GridValueFormatterParams,
  type GridValueGetterParams,
} from '@mui/x-data-grid';

export function PropertyTable({properties, isLoading}: PropertyTableProps) {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Property',
      width: 250,
      renderCell: params => (
        <Box>
          <Typography variant='body2' component='div'>
            {params.row.name}
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            {params.row.address}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: params => (
        <Chip
          label={params.value}
          color={
            params.value === 'Occupied'
              ? 'success'
              : params.value === 'Vacant'
                ? 'error'
                : 'warning'
          }
          size='small'
        />
      ),
    },
    {
      field: 'rentAmount',
      headerName: 'Rent',
      width: 130,
      valueFormatter: (params: GridValueFormatterParams) => formatCurrency(params.value),
    },
    {
      field: 'tenants',
      headerName: 'Tenants',
      width: 130,
      valueGetter: (params: GridValueGetterParams) => params.row.tenants?.length || 0,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: params => (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <DataGrid
      rows={properties}
      columns={columns}
      loading={isLoading}
      slots={{
        toolbar: GridToolbar,
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10, 25, 50]}
      checkboxSelection
      disableRowSelectionOnClick
      sx={{
        '& .MuiDataGrid-cell': {
          borderBottom: 1,
          borderColor: 'divider',
        },
      }}
    />
  );
}
