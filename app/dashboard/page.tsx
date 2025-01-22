'use client'

import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivityList } from '@/components/dashboard/recent-activity'
import type { RecentActivity } from '@/lib/types/dashboard'
import { Box, Card, Grid, Stack, Typography } from '@mui/material'
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

const mockStats = {
  totalProperties: 15,
  activeTenants: 126,
  monthlyRevenue: 148500,
  occupancyRate: 92,
  percentageChanges: {
    properties: 6.7,
    tenants: 4.5,
    revenue: 12.3,
    occupancy: 2.1
  }
}

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Stack spacing={4}>
        {/* Welcome Text */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's an overview of your property management system.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Box sx={{ mb: 2 }}>
          <DashboardStats stats={mockStats} />
        </Box>

        {/* Quick Actions & Recent Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <QuickActions />
          </Grid>
          <Grid item xs={12} lg={7}>
            <Card
              elevation={0}
              sx={{
                height: '100%',
                bgcolor: 'background.default'
              }}
            >
              <RecentActivityList activities={mockActivities} />
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </motion.div>
  )
}
