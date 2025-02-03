'use client';

import {MOCK_ANALYTICS_DATA} from '@/auth/lib/constants';
import {Box, Container, Grid, Paper, Typography} from '@mui/material';
import {motion} from 'framer-motion';
import dynamic from 'next/dynamic';

const PerformanceChart = dynamic(
  () => import('components/dashboard/performance-chart').then(mod => mod.PerformanceChart),
  {
    ssr: false,
  },
);

const DonutChart = dynamic(
  () => import('components/dashboard/donut-chart').then(mod => mod.DonutChart),
  {
    ssr: false,
  },
);

const BarChart = dynamic(() => import('components/dashboard/bar-chart').then(mod => mod.BarChart), {
  ssr: false,
});

export default function AnalyticsPage() {
  const {
    financialPerformance,
    tenantActivity,
    propertyOccupancy,
    revenueDistribution,
    tenantInsights,
  } = MOCK_ANALYTICS_DATA;

  return (
    <Container maxWidth='xl' sx={{py: 4}}>
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        <Typography variant='h4' gutterBottom fontWeight='bold'>
          Analytics Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Financial Performance */}
          <Grid item xs={12}>
            <Paper sx={{p: 3}}>
              <Typography variant='h6' gutterBottom>
                Financial Performance
              </Typography>
              <PerformanceChart
                data={financialPerformance.monthlyTrend.map(item => ({
                  name: item.month,
                  revenue: item.revenue,
                  expenses: item.expenses,
                }))}
              />
            </Paper>
          </Grid>

          {/* Tenant Activity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{p: 3, height: '100%'}}>
              <Typography variant='h6' gutterBottom>
                Tenant Activity
              </Typography>
              <DonutChart
                data={[
                  {name: 'New Leases', value: tenantActivity.newLeases},
                  {name: 'Renewals', value: tenantActivity.renewals},
                  {name: 'Move-outs', value: tenantActivity.moveOuts},
                ]}
              />
            </Paper>
          </Grid>

          {/* Revenue Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{p: 3, height: '100%'}}>
              <Typography variant='h6' gutterBottom>
                Revenue Distribution
              </Typography>
              <DonutChart
                data={Object.entries(revenueDistribution).map(([name, value]) => ({
                  name,
                  value,
                }))}
              />
            </Paper>
          </Grid>

          {/* Property Occupancy */}
          <Grid item xs={12}>
            <Paper sx={{p: 3}}>
              <Typography variant='h6' gutterBottom>
                Property Occupancy Rates
              </Typography>
              <BarChart
                data={Object.entries(propertyOccupancy).map(([name, value]) => ({
                  name,
                  value,
                }))}
              />
            </Paper>
          </Grid>

          {/* Tenant Insights */}
          <Grid item xs={12}>
            <Paper sx={{p: 3}}>
              <Typography variant='h6' gutterBottom>
                Tenant Insights
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{textAlign: 'center'}}>
                    <Typography variant='h3' color='primary'>
                      {tenantInsights.satisfaction.current}
                    </Typography>
                    <Typography variant='subtitle1'>Average Satisfaction Rating</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{textAlign: 'center'}}>
                    <Typography variant='h3' color='success.main'>
                      {tenantInsights.maintenance.avgResolutionTime.completed}
                    </Typography>
                    <Typography variant='subtitle1'>Days Average Resolution Time</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{textAlign: 'center'}}>
                    <Typography variant='h3' color='info.main'>
                      {tenantInsights.retention['2024']}%
                    </Typography>
                    <Typography variant='subtitle1'>Tenant Retention Rate</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
}
