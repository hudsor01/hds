import {Button, Card, Chip, Grid, Typography} from '@mui/material';
import type {DataGrid} from '@mui/x-data-grid';
import {sql} from '@vercel/postgres';

async function getWebhookStats() {
  const {rows} = await sql`
    SELECT
      event_type,
      status,
      COUNT(*) as count,
      MAX(created_at) as last_received
    FROM webhook_logs
    WHERE created_at > NOW() - INTERVAL '24 hours'
    GROUP BY event_type, status
  `;
  return rows;
}

export default async function WebhookMonitoring() {
  const stats = await getWebhookStats();

  function calculateSuccessRate(stats: any): import('react').ReactNode {
    throw new Error('Function not implemented.');
  }

  function calculateTotalEvents(stats: any): import('react').ReactNode {
    throw new Error('Function not implemented.');
  }

  function transformStatsForGrid(stats: any) {
    throw new Error('Function not implemented.');
  }

  function getFailedEvents(stats: any) {
    throw new Error('Function not implemented.');
  }

  function retryWebhook(row: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <div className='p-6'>
      <Typography variant='h4' gutterBottom>
        Webhook Monitoring
      </Typography>

      <Grid container spacing={3}>
        {/* Success Rate Card */}
        <Grid item xs={12} md={6}>
          <Card className='p-4'>
            <Typography variant='h6'>Success Rate (24h)</Typography>
            <Typography variant='h3'>{calculateSuccessRate(stats)}%</Typography>
          </Card>
        </Grid>

        {/* Volume Card */}
        <Grid item xs={12} md={6}>
          <Card className='p-4'>
            <Typography variant='h6'>Total Events (24h)</Typography>
            <Typography variant='h3'>{calculateTotalEvents(stats)}</Typography>
          </Card>
        </Grid>

        {/* Event Type Breakdown */}
        <Grid item xs={12}>
          <Card className='p-4'>
            <Typography variant='h6' gutterBottom>
              Events by Type
            </Typography>
            <DataGrid
              rows={transformStatsForGrid(stats)}
              columns={[
                {field: 'type', headerName: 'Event Type', width: 200},
                {field: 'count', headerName: 'Count', width: 130},
                {
                  field: 'success',
                  headerName: 'Success Rate',
                  width: 150,
                  renderCell: params => (
                    <Chip
                      label={`${params.value}%`}
                      color={params.value > 95 ? 'success' : 'warning'}
                    />
                  ),
                },
                {
                  field: 'lastReceived',
                  headerName: 'Last Received',
                  width: 200,
                  valueFormatter: params => new Date(params.value).toLocaleString(),
                },
              ]}
              autoHeight
              pageSize={5}
            />
          </Card>
        </Grid>

        {/* Failed Events */}
        <Grid item xs={12}>
          <Card className='p-4'>
            <Typography variant='h6' gutterBottom>
              Failed Events
            </Typography>
            <DataGrid
              rows={getFailedEvents(stats)}
              columns={[
                {field: 'type', headerName: 'Event Type', width: 200},
                {field: 'error', headerName: 'Error', width: 300},
                {
                  field: 'created_at',
                  headerName: 'Time',
                  width: 200,
                  valueFormatter: params => new Date(params.value).toLocaleString(),
                },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  width: 150,
                  renderCell: params => (
                    <Button
                      variant='contained'
                      size='small'
                      onClick={() => retryWebhook(params.row)}
                    >
                      Retry
                    </Button>
                  ),
                },
              ]}
              autoHeight
              pageSize={5}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
