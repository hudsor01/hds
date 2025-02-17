import { Refresh as RefreshIcon } from '@mui/icons-material'
import { Box, Button, Card, CardContent, Chip, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { type GridColDef } from '@mui/x-data-grid'
import { BaseDataGrid } from '@/components/core/Data Display/data-grid'
import { sql } from '@/lib/db'

interface WebhookStat {
  event_type: string
  status: string
  count: number
  last_received: string
}

interface EventTypeStats {
  id: string
  type: string
  count: number
  success: number
  lastReceived: string
}

interface FailedEvent {
  id: string
  type: string
  error: string
  created_at: string
}

async function getWebhookStats(): Promise<WebhookStat[]> {
  const { rows } = await sql<WebhookStat>`
    SELECT
      event_type,
      status,
      COUNT(*) as count,
      MAX(created_at) as last_received
    FROM webhook_logs
    WHERE created_at > NOW() - INTERVAL '24 hours'
    GROUP BY event_type, status
    ORDER BY event_type, status
  `
  return rows
}

function calculateSuccessRate(stats: WebhookStat[]): number {
  const total = stats.reduce((sum, stat) => sum + Number(stat.count), 0)
  const successful = stats.filter(stat => stat.status === 'success').reduce((sum, stat) => sum + Number(stat.count), 0)
  return total ? Math.round((successful / total) * 100) : 0
}

function calculateTotalEvents(stats: WebhookStat[]): number {
  return stats.reduce((sum, stat) => sum + Number(stat.count), 0)
}

function transformStatsForGrid(stats: WebhookStat[]): EventTypeStats[] {
  return Object.values(
    stats.reduce<Record<string, EventTypeStats>>((acc, stat) => {
      if (!acc[stat.event_type]) {
        acc[stat.event_type] = {
          id: stat.event_type,
          type: stat.event_type,
          count: 0,
          success: 0,
          lastReceived: stat.last_received
        }
      }

      return acc
    }, {})
  ).map(data => ({
    ...data,
    success: Math.round((data.success / data.count) * 100)
  }))
}

function getFailedEvents(stats: WebhookStat[]): FailedEvent[] {
  return stats
    .filter(stat => stat.status !== 'success')
    .map(stat => ({
      id: `${stat.event_type}-${stat.status}`,
      type: stat.event_type,
      error: stat.status,
      created_at: stat.last_received
    }))
}

export default async function WebhookMonitoring(): Promise<JSX.Element> {
  const stats = await getWebhookStats()

  const eventTypeColumns: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Event Type',
      width: 200,
      flex: 1
    },
    {
      field: 'count',
      headerName: 'Count',
      width: 130,
      align: 'right'
    },
    {
      field: 'success',
      headerName: 'Success Rate',
      width: 150,
      renderCell: params => <Chip label={`${params.value}%`} color={params.value > 95 ? 'success' : 'warning'} size="small" />
    },
    {
      field: 'lastReceived',
      headerName: 'Last Received',
      width: 200,
      valueFormatter: (params: { value: Date | string | null }) =>
        new Date(params.value ? String(params.value) : '').toLocaleString()
    }
  ]

  const failedEventsColumns: GridColDef[] = [
    {
      field: 'type',
      headerName: 'Event Type',
      width: 200,
      flex: 1
    },
    {
      field: 'error',
      headerName: 'Error',
      width: 300,
      flex: 1
    },
    {
      field: 'created_at',
      headerName: 'Time',
      width: 200,
      valueFormatter: (params: { value: Date | string | null }) =>
        new Date(params.value ? String(params.value) : '').toLocaleString()
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: params => (
        <Button
          variant="contained"
          size="small"
          onClick={async () => {
            try {
              await fetch('/api/webhooks/retry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  eventType: params.row.type,
                  id: params.row.id
                })
              })
              // You might want to add a toast notification here
            } catch (error) {
              console.error('Failed to retry webhook:', error)
              // You might want to add an error toast here
            }
          }}
        >
          Retry
        </Button>
      )
    }
  ]

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Webhook Monitoring</Typography>
        <Button
          startIcon={<RefreshIcon />}
          onClick={() => {
            window.location.reload()
          }}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Success Rate Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Success Rate (24h)
              </Typography>
              <Typography variant="h3">{calculateSuccessRate(stats)}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Volume Card */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Total Events (24h)
              </Typography>
              <Typography variant="h3">{calculateTotalEvents(stats).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Event Type Breakdown */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Events by Type
              </Typography>
              <Box sx={{ height: 400, width: '100%' }}>
                <BaseDataGrid data={transformStatsForGrid(stats)} columns={eventTypeColumns} pageSize={20} disableSelection />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Failed Events */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Failed Events
              </Typography>
              <BaseDataGrid data={getFailedEvents(stats)} columns={failedEventsColumns} pageSize={5} disableSelection />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
