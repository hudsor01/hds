import {waitlistDB} from '@/lib/db';
import {Box, Button, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

const columns = [
  {field: 'email', headerName: 'Email', width: 300},
  {
    field: 'createdAt',
    headerName: 'Joined',
    width: 200,
    valueFormatter: (params: {value: string}) => new Date(params.value).toLocaleString(),
  },
  {field: 'status', headerName: 'Status', width: 130},
];

export default async function AdminPage() {
  const entries = await waitlistDB.getAll();

  return (
    <Box sx={{p: 4}}>
      <Typography variant='h4' sx={{mb: 4}}>
        Waitlist Management
      </Typography>

      <DataGrid
        rows={entries}
        columns={columns}
        initialState={{
          sorting: {
            sortModel: [{field: 'createdAt', sort: 'desc'}],
          },
        }}
        slots={{
          toolbar: () => (
            <Box sx={{p: 2}}>
              <Button variant='contained' color='primary'>
                Export List
              </Button>
            </Box>
          ),
        }}
      />
    </Box>
  );
}
