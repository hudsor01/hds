import {BaseDataGrid} from '@/components/common/data-grid';
import {formatCurrency} from '@/lib/utils';
import {PropertyTableProps} from '@/types/property';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import {type GridColDef, type GridValueGetterParams} from '@mui/x-data-grid';

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
      valueFormatter: ({value}) => formatCurrency(value as number),
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
      renderCell: () => (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return <BaseDataGrid data={properties} columns={columns} isLoading={isLoading} pageSize={10} />;
}
