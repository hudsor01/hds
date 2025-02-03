import { PropertyMetrics } from '@/components/dashboard/property-metrics'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
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
      </Grid>
    </Box>
  );
}
