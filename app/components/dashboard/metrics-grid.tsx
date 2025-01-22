'use client'

import { Grid } from '@mui/material'
import { motion } from 'framer-motion'
import { DollarSign, FileText, Home, Tool, Users } from 'react-feather'
import { MetricCard } from './metric-card'

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
  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid
          key={metric.title}
          item
          xs={6}
          sm={4}
          md={3}
          xl={2.4}
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  )
}
