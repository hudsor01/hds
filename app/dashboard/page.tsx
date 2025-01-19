'use client'

import { DashboardStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivityList } from '@/components/dashboard/recent-activity'
import type { RecentActivity } from '@/types/dashboard'
import { Box, Container, Grid } from '@mui/material'

// Mock data for testing
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

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'PAYMENT',
    title: 'Rent Payment Received',
    description: 'John Doe paid $2,500 for Unit 101',
    timestamp: new Date(),
    status: 'COMPLETED'
  },
  {
    id: '2',
    type: 'MAINTENANCE',
    title: 'Maintenance Request',
    description: 'New request for Unit 203: Leaking faucet',
    timestamp: new Date(Date.now() - 3600000),
    status: 'PENDING'
  },
  {
    id: '3',
    type: 'APPLICATION',
    title: 'New Tenant Application',
    description: 'Sarah Smith applied for Unit 305',
    timestamp: new Date(Date.now() - 7200000),
    status: 'IN_PROGRESS'
  }
]

export default function DashboardPage() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Stats Section */}
          <Grid item xs={12}>
            <DashboardStats stats={mockStats} />
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <QuickActions />
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={8}>
            <RecentActivityList activities={mockActivities} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
