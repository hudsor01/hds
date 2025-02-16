'use client'

import type { BaseGridProps } from '@/types'
import { Box, LinearProgress, Typography } from '@mui/material'
import { DataGrid, GridToolbar, type GridColDef, type GridRowParams } from '@mui/x-data-grid'
import { ErrorBoundary } from '@/components/error-boundary'

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
    <ErrorBoundary fallback={<Typography color="error">Error loading data grid.</Typography>}>
      <Box sx={{ width: '100%', height: '100%', minHeight: 400 }}>
        <DataGrid
          rows={data}
          columns={columns}
          loading={isLoading}
          slots={{
            toolbar: customToolbar || GridToolbar,
            loadingOverlay: LinearProgress
          }}
          initialState={{
            pagination: { paginationModel: { pageSize } },
            filter: { filterModel: { items: [] } }
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection={!disableSelection}
          disableRowSelectionOnClick={!disableSelection}
          onRowClick={onRowClick ? (params: GridRowParams) => onRowClick(params.row as T) : undefined}
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
