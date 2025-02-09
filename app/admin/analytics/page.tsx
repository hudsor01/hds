import { EmailMetricsTable } from '@/components/analytics/EmailMetricsTable'
import { Box, Card, CardContent, CardHeader, Grid } from '@mui/material'
import { BarChart, LineChart } from '@mui/x-charts'

export default async function AnalyticsPage() {
  const stats = await getWaitlistStats()

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Signups Over Time" />
            <CardContent>
              <LineChart xAxis={[{ data: stats.dates }]} series={[{ data: stats.counts }]} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Email Performance" />
            <CardContent>
              <BarChart
                xAxis={[{ data: ['Sent', 'Opened', 'Clicked'] }]}
                series={[{ data: [stats.sent, stats.opened, stats.clicked] }]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <EmailMetricsTable data={stats.emailMetrics} />
        </Grid>
      </Grid>
    </Box>
  )
}

async function getWaitlistStats(): Promise<{
  emails: any[]
  sent: number
  opened: number
  clicked: number
  signups: any[]
  dates: any[]
  counts: any[]
  emailMetrics: any
}> {
  return {
    emails: [],
    sent: 100,
    opened: 80,
    clicked: 40,
    signups: [],
    dates: [],
    counts: [],
    emailMetrics: [],
  }
}
