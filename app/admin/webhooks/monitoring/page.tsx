import { Button, Card, Chip, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { sql } from '@vercel/postgres'

interface WebhookStat {
  event_type: string
  status: string
  count: number
  last_received: string
}

async function getWebhookStats() {
  const { rows } = await sql<WebhookStat>`
    SELECT
      event_type,
      status,
      COUNT(*) as count,
      MAX(created_at) as last_received
    FROM webhook_logs
    WHERE created_at > NOW() - INTERVAL '24 hours'
    GROUP BY event_type, status
  `
  return rows
}

export default async function WebhookMonitoring() {
  const stats = await getWebhookStats()

  function calculateSuccessRate(stats: WebhookStat[]): number {
    const total = stats.reduce((sum, stat) => sum + Number(stat.count), 0)
    const successful = stats
      .filter(stat => stat.status === 'success')
      .reduce((sum, stat) => sum + Number(stat.count), 0)
    return total ? Math.round((successful / total) * 100) : 0
  }

  function calculateTotalEvents(stats: WebhookStat[]): number {
    return stats.reduce((sum, stat) => sum + Number(stat.count), 0)
  }

  function transformStatsForGrid(stats: WebhookStat[]) {
    return Object.entries(
      stats.reduce(
        (acc, stat) => {
          if (!acc[stat.event_type]) {
            acc[stat.event_type] = {
              id: stat.event_type,
              type: stat.event_type,
              count: 0,
              success: 0,
              lastReceived: stat.last_received
            }
          }
          acc[stat.event_type].count += Number(stat.count)
          if (stat.status === 'success') {
            acc[stat.event_type].success += Number(stat.count)
          }
          return acc
        },
        {} as Record<string, unknown>
      )
    ).map(([_, data]) => ({
      ...data,
      success: Math.round((data.success / data.count) * 100)
    }))
  }

  function getFailedEvents(stats: WebhookStat[]) {
    return stats
      .filter(stat => stat.status !== 'success')
      .map(stat => ({
        id: `${stat.event_type}-${stat.status}`,
        type: stat.event_type,
        error: stat.status,
        created_at: stat.last_received
      }))
  }

  async function retryWebhook(row: { type: string; id: string }) {
    try {
      await fetch('/api/webhooks/retry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: row.type, id: row.id })
      })
    } catch (error) {
      console.error('Failed to retry webhook:', error)
    }
  }

  return (
    <div className="p-6">
      <Typography variant="h4" gutterBottom>
        Webhook Monitoring
      </Typography>

      <Grid container spacing={3}>
        {/* Success Rate Card */}
        <Grid item xs={12} md={6}>
          <Card className="p-4">
            <Typography variant="h6">Success Rate (24h)</Typography>
            <Typography variant="h3">{calculateSuccessRate(stats)}%</Typography>
          </Card>
        </Grid>

        {/* Volume Card */}
        <Grid item xs={12} md={6}>
          <Card className="p-4">
            <Typography variant="h6">Total Events (24h)</Typography>
            <Typography variant="h3">{calculateTotalEvents(stats)}</Typography>
          </Card>
        </Grid>

        {/* Event Type Breakdown */}
        <Grid item xs={12}>
          <Card className="p-4">
            <Typography variant="h6" gutterBottom>
              Events by Type
            </Typography>
            <DataGrid
              rows={transformStatsForGrid(stats)}
              columns={[
                { field: 'type', headerName: 'Event Type', width: 200 },
                { field: 'count', headerName: 'Count', width: 130 },
                {
                  field: 'success',
                  headerName: 'Success Rate',
                  width: 150,
                  renderCell: ({ value }) => (
                    <Chip label={`${value}%`} color={value > 95 ? 'success' : 'warning'} />
                  )
                },
                {
                  field: 'lastReceived',
                  headerName: 'Last Received',
                  width: 200,
                  valueFormatter: ({ value }) => new Date(value).toLocaleString()
                }
              ]}
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 }
                }
              }}
            />
          </Card>
        </Grid>

        {/* Failed Events */}
        <Grid item xs={12}>
          <Card className="p-4">
            <Typography variant="h6" gutterBottom>
              Failed Events
            </Typography>
            <DataGrid
              rows={getFailedEvents(stats)}
              columns={[
                { field: 'type', headerName: 'Event Type', width: 200 },
                { field: 'error', headerName: 'Error', width: 300 },
                {
                  field: 'created_at',
                  headerName: 'Time',
                  width: 200,
                  valueFormatter: ({ value }) => new Date(value).toLocaleString()
                },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  width: 150,
                  renderCell: ({ row }) => (
                    <Button variant="contained" size="small" onClick={() => retryWebhook(row)}>
                      Retry
                    </Button>
                  )
                }
              ]}
              autoHeight
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 }
                }
              }}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
