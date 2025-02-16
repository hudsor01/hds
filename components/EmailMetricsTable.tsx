'use client'

import { ErrorBoundary } from '@/components/error-boundary'
import { Alert, Box, LinearProgress, Typography } from '@mui/material'
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridValueFormatterParams
} from '@mui/x-data-grid'
import * as React from 'react'

// Define metrics interface
export interface EmailMetrics {
  template: string
  sent: number
  opened: number
  clicked: number
  openRate: number
  clickRate: number
  date?: string
  status?: 'success' | 'failed' | 'pending'
  error?: string
}

// Define component props
export interface EmailMetricsProps {
  data: EmailMetrics[]
  isLoading?: boolean
  error?: Error | null
  onRowClick?: (metric: EmailMetrics) => void
  title?: string
  description?: string
  className?: string
  pageSize?: number
  height?: number | string
}

// Format percentage values
const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

// Format number values
const formatNumber = (value: number): string => {
  return value.toLocaleString()
}

export const EmailMetricsTable = React.memo(
  ({
    data,
    isLoading = false,
    error = null,
    onRowClick,
    title = 'Email Metrics',
    description,
    className,
    pageSize = 10,
    height = 'auto'
  }: EmailMetricsProps): JSX.Element => {
    // Column definitions
    const columns: GridColDef<EmailMetrics>[] = React.useMemo(
      () => [
        {
          field: 'template',
          headerName: 'Template',
          flex: 1,
          minWidth: 200,
          renderCell: (params: GridRenderCellParams<EmailMetrics, string>) => (
            <Typography
              variant="body2"
              component="span"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={params.value} // For tooltip on hover
            >
              {params.value}
            </Typography>
          )
        },
        {
          field: 'sent',
          headerName: 'Sent',
          width: 100,
          type: 'number',
          valueFormatter: (params: GridValueFormatterParams<number>) => formatNumber(params.value)
        },
        {
          field: 'opened',
          headerName: 'Opened',
          width: 100,
          type: 'number',
          valueFormatter: (params: GridValueFormatterParams<number>) => formatNumber(params.value)
        },
        {
          field: 'clicked',
          headerName: 'Clicked',
          width: 100,
          type: 'number',
          valueFormatter: (params: GridValueFormatterParams<number>) => formatNumber(params.value)
        },
        {
          field: 'openRate',
          headerName: 'Open Rate',
          width: 120,
          type: 'number',
          valueFormatter: (params: GridValueFormatterParams<number>) =>
            formatPercentage(params.value),
          renderCell: (params: GridRenderCellParams<EmailMetrics, number>) => (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" component="span">
                {formatPercentage(params.value)}
              </Typography>
              <LinearProgress variant="determinate" value={params.value} sx={{ mt: 0.5 }} />
            </Box>
          )
        },
        {
          field: 'clickRate',
          headerName: 'Click Rate',
          width: 120,
          type: 'number',
          valueFormatter: (params: GridValueFormatterParams<number>) =>
            formatPercentage(params.value),
          renderCell: (params: GridRenderCellParams<EmailMetrics, number>) => (
            <Box sx={{ width: '100%' }}>
              <Typography variant="body2" component="span">
                {formatPercentage(params.value)}
              </Typography>
              <LinearProgress variant="determinate" value={params.value} sx={{ mt: 0.5 }} />
            </Box>
          )
        }
      ],
      []
    )

    // Handle row clicks
    const handleRowClick = React.useCallback(
      (params: any) => {
        onRowClick?.(params.row)
      },
      [onRowClick]
    )

    if (error) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          Error loading email metrics: {error.message}
        </Alert>
      )
    }

    return (
      <ErrorBoundary>
        <Box
          className={className}
          sx={{
            width: '100%',
            height,
            '& .MuiDataGrid-root': {
              border: 'none'
            }
          }}
        >
          {title && (
            <Typography variant="h6" component="h2" gutterBottom sx={{ px: 2, pt: 2 }}>
              {title}
            </Typography>
          )}

          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 2, pb: 2 }}>
              {description}
            </Typography>
          )}

          <DataGrid
            rows={data}
            columns={columns}
            loading={isLoading}
            autoHeight={height === 'auto'}
            disableRowSelectionOnClick
            onRowClick={handleRowClick}
            initialState={{
              pagination: {
                paginationModel: { pageSize }
              },
              sorting: {
                sortModel: [{ field: 'sent', sort: 'desc' }]
              }
            }}
            getRowId={row => row.template}
            slots={{
              loadingOverlay: LinearProgress,
              noRowsOverlay: () => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <Typography color="text.secondary">No email metrics available.</Typography>
                </Box>
              ),
              errorOverlay: () => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}
                >
                  <Typography color="error">Error loading email metrics.</Typography>
                </Box>
              )
            }}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none'
              }
            }}
          />
        </Box>
      </ErrorBoundary>
    )
  }
)

EmailMetricsTable.displayName = 'EmailMetricsTable'

export default EmailMetricsTable
