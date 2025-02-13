import { EmailMetricsTable } from '@/components/analytics/EmailMetricsTable'
import { ErrorBoundary } from '@/components/error/error-boundary'
import { getEmailMetrics } from '@/lib/services/analytics'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material'
import { BarChart, LineChart } from '@mui/x-charts'
import { Suspense } from 'react'

async function getAnalyticsData() {
  try {
    const emailStats = await getEmailMetrics('system') // Replace with actual userId

    return {
      dates: Array.from({ length: 30 }, (_, i) => new Date(Date.now() - i * 24 * 60 * 60 * 1000)),
      counts: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100)), // Replace with actual data
      sent: emailStats.sent,
      opened: emailStats.opened,
      clicked: emailStats.clicked,
      emailMetrics: [
        {
          template: 'Welcome',
          sent: emailStats.sent,
          opened: emailStats.opened,
          clicked: emailStats.clicked,
          openRate: (emailStats.opened / emailStats.sent) * 100,
          clickRate: (emailStats.clicked / emailStats.sent) * 100
        }
      ]
    }
  } catch (error) {
    console.error('Failed to fetch analytics data:', error)
    throw error
  }
}

export default async function AnalyticsPage() {
  try {
    const stats = await getAnalyticsData()

    return (
      <ErrorBoundary>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Signups Over Time" />
                <CardContent>
                  <Suspense fallback={<CircularProgress />}>
                    <LineChart
                      xAxis={[{ data: stats.dates, label: 'Date' }]}
                      series={[{ data: stats.counts, label: 'Signups' }]}
                      height={300}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader title="Email Performance" />
                <CardContent>
                  <Suspense fallback={<CircularProgress />}>
                    <BarChart
                      xAxis={[
                        {
                          scaleType: 'band',
                          data: ['Sent', 'Opened', 'Clicked'],
                          label: 'Metric'
                        }
                      ]}
                      series={[
                        {
                          data: [stats.sent, stats.opened, stats.clicked],
                          label: 'Count'
                        }
                      ]}
                      height={300}
                    />
                  </Suspense>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardHeader title="Email Metrics by Template" />
                <CardContent>
                  <Suspense fallback={<CircularProgress />}>
                    <EmailMetricsTable data={stats.emailMetrics} isLoading={false} />
                  </Suspense>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </ErrorBoundary>
    )
  } catch (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">
          Error loading analytics: {error instanceof Error ? error.message : 'Unknown error'}
        </Typography>
      </Box>
    )
  }
}
