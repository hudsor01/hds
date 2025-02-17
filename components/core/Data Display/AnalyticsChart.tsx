import { Card, CardContent, CardHeader, MenuItem, Select, Box, useTheme } from '@mui/material'
import { LineChart } from '@mui/x-charts'

interface AnalyticsChartProps {
  data: Array<{ date: string; value: number }>
  title: string
  timeRange: 'day' | 'week' | 'month' | 'year'
  onTimeRangeChange?: (range: string) => void
}

export function AnalyticsChart({ data, title, timeRange, onTimeRangeChange }: AnalyticsChartProps) {
  const theme = useTheme()

  // Transform data for MUI X-Charts
  const xAxisData = data.map(item => item.date)
  const seriesData = data.map(item => item.value)

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
          <LineChart
            xAxis={[{ data: xAxisData, scaleType: 'point' }]}
            series={[
              {
                data: seriesData,
                area: true,
                color: theme.palette.primary.main
              }
            ]}
            height={300}
          />
        </Box>
      </CardContent>
    </Card>
  )
}
