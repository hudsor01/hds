// components/dashboard/property-metrics.tsx
'use client'

import { formatCurrency } from '@/lib/utils'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'

// components/dashboard/property-metrics.tsx

export function PropertyMetrics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['propertyMetrics'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/metrics')
      return response.json()
    }
  })

  const stats = [
    {
      name: 'Total Properties',
      value: metrics?.totalProperties || 0,
      trend: metrics?.propertyTrend || 0,
      trendText: 'from last month'
    },
    {
      name: 'Monthly Revenue',
      value: formatCurrency(metrics?.monthlyRevenue || 0),
      trend: metrics?.revenueTrend || 0,
      trendText: 'vs last month'
    },
    {
      name: 'Occupancy Rate',
      value: `${metrics?.occupancyRate || 0}%`,
      trend: metrics?.occupancyTrend || 0,
      trendText: 'from last month'
    },
    {
      name: 'Active Maintenance',
      value: metrics?.activeMaintenanceRequests || 0,
      trend: metrics?.maintenanceTrend || 0,
      trendText: 'vs last month'
    }
  ]

  return (
    <Grid container spacing={3}>
      {stats.map(stat => (
        <Grid item xs={12} sm={6} md={3} key={stat.name}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              {stat.name}
            </Typography>
            <Typography variant="h4" sx={{ my: 1 }}>
              {stat.value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {stat.trend > 0 ? (
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
              ) : (
                <TrendingDownIcon color="error" sx={{ mr: 1 }} />
              )}
              <Typography
                variant="body2"
                color={stat.trend > 0 ? 'success.main' : 'error.main'}
                component="span"
              >
                {Math.abs(stat.trend)}%
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {stat.trendText}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}

PropertyMetrics.Skeleton = function Skeleton() {
  return (
    <Grid container spacing={3}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box sx={{ animation: 'pulse 2s infinite' }}>
              <Box sx={{ bgcolor: 'grey.200', height: 20, width: 100, mb: 2 }} />
              <Box sx={{ bgcolor: 'grey.200', height: 40, width: 150, mb: 1 }} />
              <Box sx={{ bgcolor: 'grey.200', height: 20, width: 80 }} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
