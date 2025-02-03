import {Box, Card, CardContent, CardHeader, Grid} from '@mui/material';
import {BarChart, LineChart} from '@mui/x-charts';

export default async function AnalyticsPage() {
  const stats = await getWaitlistStats();

  return (
    <Box sx={{p: 4}}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Signups Over Time' />
            <CardContent>
              <LineChart
                data={stats.signups}
                xAxis={[{data: stats.dates}]}
                series={[{data: stats.counts}]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title='Email Performance' />
            <CardContent>
              <BarChart
                data={stats.emails}
                xAxis={[{data: ['Sent', 'Opened', 'Clicked']}]}
                series={[{data: [stats.sent, stats.opened, stats.clicked]}]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <EmailMetricsTable data={stats.emailMetrics} />
        </Grid>
      </Grid>
    </Box>
  );
}
