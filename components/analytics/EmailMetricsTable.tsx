import { ErrorBoundary } from '@/components/error/error-boundary'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Typography } from '@mui/material'

export interface EmailMetrics {
  template: string
  sent: number
  opened: number
  clicked: number
  openRate: number
  clickRate: number
}

export interface EmailMetricsProps {
  data: EmailMetrics[]
  isLoading: boolean
  error?: Error
}

interface CellParams {
  value: number
}

export function EmailMetricsTable({ data, isLoading, error }: EmailMetricsProps) {
  const columns: GridColDef[] = [
    {
      field: 'template',
      headerName: 'Template',
      flex: 1,
      minWidth: 200
    },
    {
      field: 'sent',
      headerName: 'Sent',
      width: 100,
      type: 'number'
    },
    {
      field: 'opened',
      headerName: 'Opened',
      width: 100,
      type: 'number'
    },
    {
      field: 'clicked',
      headerName: 'Clicked',
      width: 100,
      type: 'number'
    },
    {
      field: 'openRate',
      headerName: 'Open Rate',
      width: 120,
      valueFormatter: (params: CellParams) => `${params.value}%`,
      type: 'number'
    },
    {
      field: 'clickRate',
      headerName: 'Click Rate',
      width: 120,
      valueFormatter: (params: CellParams) => `${params.value}%`,
      type: 'number'
    }
  ]

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error loading email metrics: {error.message}</Typography>
      </Box>
    )
  }

  return (
    <ErrorBoundary>
      <DataGrid
        rows={data}
        columns={columns}
        loading={isLoading}
        autoHeight
        disableRowSelectionOnClick
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          sorting: { sortModel: [{ field: 'sent', sort: 'desc' }] }
        }}
        getRowId={row => row.template}
        components={{
          NoRowsOverlay: () => (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography>No email metrics available.</Typography>
            </Box>
          ),
          ErrorOverlay: () => (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="error">Error loading email metrics.</Typography>
            </Box>
          )
        }}
      />
    </ErrorBoundary>
  )
}
