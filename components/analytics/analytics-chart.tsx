'use client'

import { TimeSeriesData } from '@/types'
import { Card, CardContent, CardHeader, useTheme } from '@mui/material'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'

export interface TimeSeriesData {
  date: string
  value: number
}

export interface AnalyticsChartProps {
  data: TimeSeriesData[]
  title: string
  description?: string
  loading?: boolean
  valuePrefix?: string
  valueSuffix?: string
  color?: string
  height?: number
}

export function AnalyticsChart({
  data,
  title,
  description,
  loading,
  valuePrefix = '',
  valueSuffix = '',
  color,
  height = 300
}: AnalyticsChartProps) {
  const theme = useTheme()

  const formatValue = (value: number) => `${valuePrefix}${value.toLocaleString()}${valueSuffix}`

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={title}
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 600
          }
        }}
      />
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={color || theme.palette.primary.main}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={color || theme.palette.primary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
            <XAxis
              dataKey="date"
              stroke={theme.palette.text.secondary}
              style={{ fontSize: '12px' }}
              tickFormatter={value => new Date(value).toLocaleDateString()}
              dy={10}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              style={{ fontSize: '12px' }}
              tickFormatter={formatValue}
              dx={-10}
            />
            <Tooltip
              formatter={(value: number) => formatValue(value)}
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2]
              }}
              labelFormatter={value => new Date(value).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color || theme.palette.primary.main}
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
