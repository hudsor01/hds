import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import {
  DataGrid,
  type GridColDef,
  type GridSlotsComponent,
} from '@mui/x-data-grid';

interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  pageSize?: number;
}

export function DataTable({
  columns,
  rows,
  loading = false,
  pageSize = 10,
}: DataTableProps) {
  return (
    <Box sx={{ width: '100%', height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        loading={loading}
        slots={{
          loadingOverlay:
            LinearProgress as GridSlotsComponent['loadingOverlay'],
        }}
      />
    </Box>
  );
}
