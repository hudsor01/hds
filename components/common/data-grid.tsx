import type { BaseGridProps } from '@/types'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridToolbar, type GridColDef, type GridRowParams } from '@mui/x-data-grid'
import { ErrorBoundary } from '@/components/common/error-boundary'

export function BaseDataGrid<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  pageSize = 10,
  onRowClick,
  customToolbar,
  disableSelection
}: BaseGridProps<T> & {
  columns: GridColDef[]
  customToolbar?: typeof GridToolbar
  disableSelection?: boolean
}) {
  const handleRowClick = onRowClick
    ? (params: GridRowParams) => onRowClick(params.row as T)
    : undefined

  return (
    <ErrorBoundary fallback={<Typography color="error">Error loading data grid.</Typography>}>
      <Box sx={{ width: '100%', height: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          slots={{
            toolbar: customToolbar || GridToolbar
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize
              }
            }
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection={!disableSelection}
          disableRowSelectionOnClick={!disableSelection}
          onRowClick={handleRowClick}
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: 1,
              borderColor: 'divider'
            }
          }}
        />
      </Box>
    </ErrorBoundary>
  )
}
