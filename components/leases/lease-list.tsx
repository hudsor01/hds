import {LeaseActions} from './lease-actions';
import {useLeases} from '@/hooks/use-leases';
import {formatCurrency} from '@/lib/utils';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {format} from 'date-fns';

export function LeaseList() {
  const {data: leases, isLoading} = useLeases();

  const columns: GridColDef[] = [
    {
      field: 'propertyId',
      headerName: 'Property',
      width: 200,
      valueGetter: params => params.row.property?.name || 'N/A',
    },
    {
      field: 'tenantId',
      headerName: 'Tenant',
      width: 200,
      valueGetter: params => params.row.tenant?.name || 'N/A',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
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
          size='small'
        />
      ),
    },
    {
      field: 'rentAmount',
      headerName: 'Rent',
      width: 130,
      valueFormatter: params => formatCurrency(params.value),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 130,
      valueFormatter: params => format(new Date(params.value), 'MM/dd/yyyy'),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 130,
      valueFormatter: params => format(new Date(params.value), 'MM/dd/yyyy'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: params => (
        <LeaseActions leaseId={params.row.id} leaseStatus={params.row.status} />
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{mb: 3, display: 'flex', justifyContent: 'flex-end'}}>
        <Button variant='contained' startIcon={<AddIcon />} href='/leases/new'>
          Create Lease
        </Button>
      </Box>

      <DataGrid
        rows={leases || []}
        columns={columns}
        loading={isLoading}
        autoHeight
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {pageSize: 10},
          },
        }}
      />
    </Box>
  );
}
