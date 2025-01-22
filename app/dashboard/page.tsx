'use client'

import { MetricsGrid } from '@/components/dashboard/metrics-grid'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivityList } from '@/components/dashboard/recent-activity'
import type { RecentActivity } from '@/lib/types/dashboard'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'APPLICATION',
    title: 'New Tenant Application',
    description: 'John Smith applied for Unit 3B at Riverside Apartments',
    timestamp: new Date('2024-01-20T10:30:00'),
    status: 'PENDING',
    priority: 'high'
  },
  {
    id: '2',
    type: 'MAINTENANCE',
    title: 'Urgent Repair Request',
    description: 'Water leak reported in Unit 5A at Oakwood Heights',
    timestamp: new Date('2024-01-19T15:45:00'),
    status: 'IN_PROGRESS',
    priority: 'high'
  },
  {
    id: '3',
    type: 'PAYMENT',
    title: 'Rent Payment Received',
    description: 'Monthly rent received from Sarah Johnson - Unit 2C',
    timestamp: new Date('2024-01-19T09:15:00'),
    status: 'COMPLETED',
    amount: 2500
  },
  {
    id: '4',
    type: 'MAINTENANCE',
    title: 'Routine Inspection',
    description: 'Scheduled HVAC maintenance for Pine View Apartments',
    timestamp: new Date('2024-01-18T14:20:00'),
    status: 'PENDING',
    priority: 'low'
  },
  {
    id: '5',
    type: 'PAYMENT',
    title: 'Late Payment Notice',
    description: 'Payment reminder sent to Unit 7B tenant',
    timestamp: new Date('2024-01-18T11:00:00'),
    status: 'PENDING',
    amount: 1800
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function DashboardPage() {
  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      sx={{
        px: { xs: 2, sm: 3, md: 4 },
        py: 2,
        maxWidth: '100%',
        width: '100%',
        mx: 'auto'
      }}
    >
      <Box component={motion.div} variants={itemVariants} sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 700 }}>
          Welcome back
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Here's what's happening with your properties today.
        </Typography>
      </Box>

      <Box component={motion.div} variants={itemVariants} sx={{ mb: 3 }}>
        <MetricsGrid />
      </Box>

      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            lg: '280px 1fr'
          }
        }}
      >
        <QuickActions />
        <RecentActivityList activities={mockActivities} />
      </Box>
    </Box>
  )
}
