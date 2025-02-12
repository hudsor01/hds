'use client'

import { Grid, Paper, Stack, Typography, alpha, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { DollarSign, FileText, Home, Tool, Users } from 'react-feather'

const metrics = [
  {
    title: 'Total Properties',
    value: 42,
    icon: Home,
    color: 'primary' as const,
    percentageChange: 12.5,
    tooltip: 'Total number of properties under management'
  },
  {
    title: 'Active Tenants',
    value: 156,
    icon: Users,
    color: 'success' as const,
    percentageChange: 8.3,
    tooltip: 'Number of current tenants across all properties'
  },
  {
    title: 'Maintenance Requests',
    value: 23,
    icon: Tool,
    color: 'warning' as const,
    percentageChange: -5.2,
    tooltip: 'Open maintenance requests requiring attention'
  },
  {
    title: 'Active Leases',
    value: 89,
    icon: FileText,
    color: 'info' as const,
    percentageChange: 15.7,
    tooltip: 'Number of active lease agreements'
  },
  {
    title: 'Monthly Revenue',
    value: 125750,
    icon: DollarSign,
    color: 'primary' as const,
    percentageChange: 10.2,
    tooltip: 'Total monthly revenue from all properties',
    formatType: 'currency' as const
  }
]

export function MetricsGrid() {
  const theme = useTheme()

  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid
          key={metric.title}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2.4}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Paper
            sx={{
              p: 3,
              height: '100%',
              bgcolor: alpha(theme.palette[metric.color].main, 0.04),
              border: '1px solid',
              borderColor: alpha(theme.palette[metric.color].main, 0.12),
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
                borderColor: alpha(theme.palette[metric.color].main, 0.24)
              }
            }}
          >
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Paper
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette[metric.color].main, 0.12),
                    color: theme.palette[metric.color].main
                  }}
                >
                  <metric.icon size={24} />
                </Paper>
                {metric.percentageChange && (
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 'auto',
                      color: metric.percentageChange > 0 ? 'success.main' : 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    {metric.percentageChange > 0 ? '↑' : '↓'}
                    {Math.abs(metric.percentageChange)}%
                  </Typography>
                )}
              </Stack>

              <Stack spacing={0.5}>
                <Typography variant="h4">
                  {metric.formatType === 'currency'
                    ? new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0
                      }).format(metric.value)
                    : metric.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {metric.title}
                </Typography>
              </Stack>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  )
}
