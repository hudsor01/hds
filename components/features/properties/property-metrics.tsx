'use client'

import { useMemo } from 'react'
import { Box, Card, CardContent, Grid, Typography, LinearProgress, Tooltip, Stack } from '@mui/material'
import { TrendingUp, Users, DollarSign, Calendar, AlertCircle, CheckCircle } from 'react-feather'
import { type Property } from '@/types/properties'
import { formatCurrency, formatPercent } from '@/utils/format'
import { cn } from '@/lib/utils'

export interface PropertyMetric {
  label: string
  value: string | number
  icon: JSX.Element
  trend?: number
  tooltip?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  progress?: number
}

export interface PropertyMetricsProps {
  property: Property
  className?: string
  loading?: boolean
  error?: Error | null
  onMetricClick?: (metricKey: string) => void
}

export function PropertyMetrics({
  property,
  className,
  loading = false,
  error = null,
  onMetricClick
}: PropertyMetricsProps): JSX.Element {
  const metrics = useMemo(() => {
    const occupancyRate = property.total_units ? (property.occupied_units / property.total_units) * 100 : 0

    return [
      {
        key: 'monthly_income',
        label: 'Monthly Income',
        value: formatCurrency(property.monthly_rent * property.occupied_units),
        icon: <DollarSign className="h-5 w-5" />,
        tooltip: 'Total monthly rental income from occupied units',
        color: 'primary'
      },
      {
        key: 'occupancy',
        label: 'Occupancy Rate',
        value: formatPercent(occupancyRate / 100),
        icon: <Users className="h-5 w-5" />,
        progress: occupancyRate,
        tooltip: `${property.occupied_units} out of ${property.total_units} units occupied`,
        color: occupancyRate >= 90 ? 'success' : occupancyRate >= 70 ? 'warning' : 'error'
      },
      {
        key: 'maintenance',
        label: 'Maintenance',
        value: property.pending_maintenance || 0,
        icon: <AlertCircle className="h-5 w-5" />,
        tooltip: 'Pending maintenance requests',
        color: property.pending_maintenance === 0 ? 'success' : property.pending_maintenance <= 2 ? 'warning' : 'error'
      },
      {
        key: 'roi',
        label: 'ROI',
        value: formatPercent(property.annual_roi / 100),
        icon: <TrendingUp className="h-5 w-5" />,
        tooltip: 'Annual return on investment',
        color: property.annual_roi >= 8 ? 'success' : property.annual_roi >= 5 ? 'warning' : 'error'
      },
      {
        key: 'lease_status',
        label: 'Lease Status',
        value: property.status === 'rented' ? 'Active' : 'Inactive',
        icon: <Calendar className="h-5 w-5" />,
        tooltip:
          property.status === 'rented'
            ? `Lease active until ${new Date(property.lease_end).toLocaleDateString()}`
            : 'No active lease',
        color: property.status === 'rented' ? 'success' : 'warning'
      },
      {
        key: 'compliance',
        label: 'Compliance',
        value: property.compliance_status === 'compliant' ? 'Compliant' : 'Action Needed',
        icon: <CheckCircle className="h-5 w-5" />,
        tooltip: property.compliance_notes || 'All compliance requirements met',
        color: property.compliance_status === 'compliant' ? 'success' : 'error'
      }
    ] as const
  }, [property])

  if (error) {
    return (
      <Box className="p-4 text-center">
        <Typography color="error" variant="body2">
          Error loading metrics: {error.message}
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={3} className={className}>
      {metrics.map(metric => (
        <Grid item xs={12} sm={6} md={4} key={metric.key}>
          <Card
            className={cn('transition-all duration-200', onMetricClick && 'cursor-pointer hover:shadow-md')}
            onClick={() => onMetricClick?.(metric.key)}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box className="flex items-center justify-between">
                  <Box className="flex items-center space-x-2">
                    <Box
                      className={cn(
                        'rounded-full p-2',
                        metric.color === 'primary' && 'bg-primary-50 text-primary-600',
                        metric.color === 'success' && 'bg-success-50 text-success-600',
                        metric.color === 'warning' && 'bg-warning-50 text-warning-600',
                        metric.color === 'error' && 'bg-error-50 text-error-600',
                        metric.color === 'info' && 'bg-info-50 text-info-600'
                      )}
                    >
                      {metric.icon}
                    </Box>
                    <Typography variant="subtitle2" color="text.secondary" className="font-medium">
                      {metric.label}
                    </Typography>
                  </Box>
                  {metric.tooltip && (
                    <Tooltip title={metric.tooltip} placement="top">
                      <Box>
                        <AlertCircle className="h-4 w-4 text-gray-400" />
                      </Box>
                    </Tooltip>
                  )}
                </Box>

                <Typography variant="h6" className="font-semibold">
                  {loading ? <Box className="h-6 w-24 animate-pulse rounded bg-gray-200" /> : metric.value}
                </Typography>

                {metric.progress !== undefined && (
                  <LinearProgress
                    variant="determinate"
                    value={loading ? 0 : metric.progress}
                    color={metric.color}
                    className={cn('h-1 rounded-full', loading && 'animate-pulse bg-gray-200')}
                  />
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
