import { Card, CardContent, CardHeader, MenuItem, Select, Box, useTheme } from '@mui/material'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface AnalyticsChartProps {
  data: any[]
  title: string
  timeRange: 'day' | 'week' | 'month' | 'year'
  onTimeRangeChange?: (range: string) => void
}

export function AnalyticsChart({ data, title, timeRange, onTimeRangeChange }: AnalyticsChartProps) {
  const theme = useTheme()

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Select value={timeRange} onChange={e => onTimeRangeChange?.(e.target.value)} size="small">
            <MenuItem value="day">Last 24 hours</MenuItem>
            <MenuItem value="week">Last 7 days</MenuItem>
            <MenuItem value="month">Last 30 days</MenuItem>
            <MenuItem value="year">Last 12 months</MenuItem>
          </Select>
        }
      />
      <CardContent>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
              <XAxis dataKey="date" stroke={theme.palette.text.secondary} style={{ fontSize: '12px' }} />
              <YAxis stroke={theme.palette.text.secondary} style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: theme.shape.borderRadius
                }}
              />
              <Line type="monotone" dataKey="value" stroke={theme.palette.primary.main} dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
