import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

interface AnalyticsChartProps {
  title: string
  data: Array<{ timestamp: string; value: number }>
  valuePrefix?: string
  valueSuffix?: string
  color?: string
}

export default function AnalyticsChart({
  title,
  data,
  valuePrefix = '',
  valueSuffix = '',
  color
}: AnalyticsChartProps) {
  const theme = useTheme()
  const chartColor = color || theme.palette.primary.main

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={value => new Date(value).toLocaleDateString()}
              />
              <YAxis
                tickFormatter={value => `${valuePrefix}${value.toLocaleString()}${valueSuffix}`}
              />
              <Tooltip
                formatter={(value: number) =>
                  `${valuePrefix}${value.toLocaleString()}${valueSuffix}`
                }
                labelFormatter={label => new Date(label).toLocaleDateString()}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                fill={chartColor}
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}
