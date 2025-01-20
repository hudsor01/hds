'use client'

import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivityList } from '@/components/dashboard/recent-activity'
import type { RecentActivity } from '@/lib/types/dashboard'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'

// Mock data for testing
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

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 }
}

export default function DashboardPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Page Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Welcome back! Here's an overview of your property management system.
            </Typography>
          </Box>

          {/* Stats Grid */}
          <motion.div
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            <DashboardStats stats={mockStats} />
          </motion.div>

          {/* Content Grid */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {/* Quick Actions */}
            <Grid item xs={12} md={4}>
              <motion.div
                variants={itemVariants}
                transition={{ delay: 0.3 }}
              >
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
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Quick Actions
                  </Typography>
                  <QuickActions />
                </Paper>
              </motion.div>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={8}>
              <motion.div
                variants={itemVariants}
                transition={{ delay: 0.4 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <RecentActivityList activities={mockActivities} />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
    </Container>
  )
}
