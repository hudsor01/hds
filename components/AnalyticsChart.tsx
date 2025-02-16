'use client'

import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import * as React from 'react'
import { type JSX } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type AreaProps,
  type TooltipProps
} from 'recharts'

// Define data point type
export interface AnalyticsDataPoint {
  timestamp: string
  value: number
  [key: string]: unknown
}

// Define chart props
export interface AnalyticsChartProps {
  title: string
  data: AnalyticsDataPoint[]
  valuePrefix?: string
  valueSuffix?: string
  color?: string
  height?: number
  tooltipFormatter?: (value: number) => string
  dateFormatter?: (timestamp: string) => string
  description?: string
  className?: string
  areaProps?: Partial<AreaProps>
  tooltipProps?: Partial<TooltipProps<number, string>>
}

const AnalyticsChart = React.memo(
  ({
    title,
    data,
    valuePrefix = '',
    valueSuffix = '',
    color,
    height = 300,
    tooltipFormatter,
    dateFormatter,
    description,
    className,
    areaProps,
    tooltipProps
  }: AnalyticsChartProps): JSX.Element => {
    const theme = useTheme()
    const chartColor = color || theme.palette.primary.main
    const chartId = React.useId()

    // Date formatting function
    const formatDate = React.useCallback(
      (timestamp: string) => {
        if (dateFormatter) return dateFormatter(timestamp)
        return new Date(timestamp).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      },
      [dateFormatter]
    )

    // Value formatting function
    const formatValue = React.useCallback(
      (value: number) => {
        if (tooltipFormatter) return tooltipFormatter(value)
        return `${valuePrefix}${value.toLocaleString()}${valueSuffix}`
      },
      [valuePrefix, valueSuffix, tooltipFormatter]
    )

    // Calculate Y-axis domain with some padding
    const yDomain = React.useMemo(() => {
      const values = data.map(d => d.value)
      const min = Math.min(...values)
      const max = Math.max(...values)
      const padding = (max - min) * 0.1
      return [Math.max(0, min - padding), max + padding]
    }, [data])

    return (
      <Card className={className}>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom id={`${chartId}-title`}>
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
              id={`${chartId}-description`}
            >
              {description}
            </Typography>
          )}

          <Box
            sx={{ width: '100%', height }}
            role="img"
            aria-labelledby={`${chartId}-title ${chartId}-description`}
          >
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
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={formatDate}
                  stroke={theme.palette.text.secondary}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tickFormatter={formatValue}
                  stroke={theme.palette.text.secondary}
                  tickLine={false}
                  axisLine={false}
                  domain={yDomain}
                />
                <Tooltip
                  formatter={(value: number) => formatValue(value)}
                  labelFormatter={(label: string) => formatDate(label)}
                  contentStyle={{
                    background: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: theme.shadows[1]
                  }}
                  {...tooltipProps}
                />
                <Area
                  {...areaProps}
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  fill={chartColor}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  activeDot={{
                    r: 4,
                    strokeWidth: 2,
                    stroke: theme.palette.background.paper
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    )
  }
)

AnalyticsChart.displayName = 'AnalyticsChart'

export default AnalyticsChart
