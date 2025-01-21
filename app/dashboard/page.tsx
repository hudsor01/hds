'use client'

import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivityList } from '@/components/dashboard/recent-activity'
import type { RecentActivity } from '@/lib/types/dashboard'
import { Box, Card, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const mockActivities: RecentActivity[] = []

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
      <Stack spacing={3}>
        {/* Welcome Text */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Here's an overview of your property management system.
          </Typography>
        </Box>

        {/* Stats Section */}
        <DashboardStats stats={mockStats} />

        {/* Quick Actions & Recent Activity */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <QuickActions />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Box sx={{ p: 3 }}>
                <RecentActivityList activities={mockActivities} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </motion.div>
  )
}
