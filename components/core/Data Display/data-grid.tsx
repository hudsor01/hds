'use client'

import { ErrorBoundary } from '@/components/ui/error-boundary'
import { Box, LinearProgress } from '@mui/material'
import { DataGrid, GridToolbar, type GridColDef, type GridRowParams } from '@mui/x-data-grid'

interface BaseGridProps<T extends { id: string | number }> {
  data: T[]
  isLoading?: boolean
  pageSize?: number
  onRowClick?: (row: T) => void
}

function CustomLoadingOverlay() {
  return (
    <Box sx={{ position: 'absolute', top: 0, width: '100%' }}>
      <LinearProgress />
    </Box>
  )
}

export function BaseDataGrid<T extends { id: string | number }>({
  data,
  columns,
  isLoading,
  pageSize = 10,
  onRowClick,
  customToolbar,
  disableSelection,
  ...props
}: BaseGridProps<T> & {
  columns: GridColDef[]
  customToolbar?: typeof GridToolbar
  disableSelection?: boolean
}) {
  return (
    <ErrorBoundary>
      <Box
        sx={{
          position: 'relative',
          height: 400, // Or any other fixed height
          width: '100%'
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading ?? false}
          slots={{
            toolbar: customToolbar || GridToolbar,
            loadingOverlay: CustomLoadingOverlay
          }}
          initialState={{
            pagination: { paginationModel: { pageSize } },
            filter: { filterModel: { items: [] } }
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection={!disableSelection}
          disableRowSelectionOnClick={!disableSelection}
          {...(onRowClick
            ? {
                onRowClick: (params: GridRowParams) => {
                  onRowClick(params.row as T)
                }
              }
            : {})}
          filterMode="server"
          sortingMode="server"
          density="comfortable"
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: 1,
              borderColor: 'divider'
            }
          }}
          {...props}
        />
      </Box>
    </ErrorBoundary>
  )
}
