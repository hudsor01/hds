// app/(dashboard)/dashboard/page.tsx
import { MaintenanceOverview } from '@/components/dashboard/maintenance-overview'
import { OccupancyRates } from '@/components/dashboard/occupancy-rates'
import { PropertyMetrics } from '@/components/dashboard/property-metrics'
import { RecentActivities } from '@/components/dashboard/recent-activities'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { UpcomingPayments } from '@/components/dashboard/upcoming-payments'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Summary Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Suspense fallback={<PropertyMetrics.Skeleton />}>
            <PropertyMetrics />
          </Suspense>
        </Grid>
      </Grid>

      {/* Main Dashboard Content */}
      <Grid container spacing={3}>
        {/* Revenue Chart - Takes up 8 columns on larger screens */}
        <Grid item xs={12} lg={8}>
          <Suspense fallback={<RevenueChart.Skeleton />}>
            <RevenueChart />
          </Suspense>
        </Grid>

        {/* Occupancy Rates - Takes up 4 columns */}
        <Grid item xs={12} lg={4}>
          <Suspense fallback={<OccupancyRates.Skeleton />}>
            <OccupancyRates />
          </Suspense>
        </Grid>

        {/* Maintenance Overview - 6 columns */}
        <Grid item xs={12} md={6}>
          <Suspense fallback={<MaintenanceOverview.Skeleton />}>
            <MaintenanceOverview />
          </Suspense>
        </Grid>

        {/* Recent Activities - 6 columns */}
        <Grid item xs={12} md={6}>
          <Suspense fallback={<RecentActivities.Skeleton />}>
            <RecentActivities />
          </Suspense>
        </Grid>

        {/* Upcoming Payments - Full width */}
        <Grid item xs={12}>
          <Suspense fallback={<UpcomingPayments.Skeleton />}>
            <UpcomingPayments />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
