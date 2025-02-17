'use client'

import { useMemo } from 'react'
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell
} from 'recharts'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ChartProps {
  data: any[]
  title?: string
  description?: string
  className?: string
}

interface BarChartProps extends ChartProps {
  xDataKey: string
  yDataKey: string | string[]
  stackedBars?: boolean
}

interface LineChartProps extends ChartProps {
  xDataKey: string
  yDataKey: string | string[]
  showGrid?: boolean
}

interface PieChartProps extends ChartProps {
  dataKey: string
  nameKey: string
}

const defaultColors = [
  'var(--chart-color-1, #2563eb)',
  'var(--chart-color-2, #16a34a)',
  'var(--chart-color-3, #dc2626)',
  'var(--chart-color-4, #ca8a04)',
  'var(--chart-color-5, #9333ea)'
]

export function BarChart({ data, xDataKey, yDataKey, stackedBars = false, title, description, className }: BarChartProps) {
  const { theme } = useTheme()
  const yDataKeys = Array.isArray(yDataKey) ? yDataKey : [yDataKey]

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsBarChart data={data}>
            <XAxis dataKey={xDataKey} stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} fontSize={12} />
            <YAxis stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1c1c1c' : '#ffffff',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            />
            {yDataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={defaultColors[index % defaultColors.length]}
                stackId={stackedBars ? 'stack' : undefined}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function LineChart({ data, xDataKey, yDataKey, showGrid = true, title, description, className }: LineChartProps) {
  const { theme } = useTheme()
  const yDataKeys = Array.isArray(yDataKey) ? yDataKey : [yDataKey]

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsLineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xDataKey} stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} fontSize={12} />
            <YAxis stroke={theme === 'dark' ? '#a3a3a3' : '#525252'} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1c1c1c' : '#ffffff',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            />
            {yDataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={defaultColors[index % defaultColors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function PieChart({ data, dataKey, nameKey, title, description, className }: PieChartProps) {
  const { theme } = useTheme()

  const total = useMemo(() => data.reduce((sum, item) => sum + (item[dataKey] as number), 0), [data, dataKey])

  return (
    <Card className={className}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <RechartsPieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={defaultColors[index % defaultColors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1c1c1c' : '#ffffff',
                border: 'none',
                borderRadius: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              formatter={value => [`${(((value as number) / total) * 100).toFixed(1)}%`, 'Percentage']}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

// Analytics specific chart with additional features
export function AnalyticsChart({ data, title, description, className }: ChartProps) {
  return (
    <LineChart
      data={data}
      xDataKey="date"
      yDataKey={['views', 'visitors']}
      title={title || 'Analytics Overview'}
      description={description || 'Website traffic and engagement metrics'}
      className={className}
      showGrid
    />
  )
}

// Financial chart with specialized formatting
export function FinancialChart({ data, title, description, className }: ChartProps) {
  const formattedData = useMemo(
    () =>
      data.map(item => ({
        ...item,
        value:
          typeof item.value === 'number'
            ? new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(item.value)
            : item.value
      })),
    [data]
  )

  return (
    <BarChart
      data={formattedData}
      xDataKey="period"
      yDataKey={['revenue', 'expenses']}
      stackedBars={false}
      title={title || 'Financial Overview'}
      description={description || 'Revenue and expense breakdown'}
      className={className}
    />
  )
}

// Performance chart for metrics
export function PerformanceChart({ data, metrics, title, description, className }: ChartProps & { metrics: string[] }) {
  return (
    <LineChart
      data={data}
      xDataKey="timestamp"
      yDataKey={metrics}
      title={title || 'Performance Metrics'}
      description={description || 'System performance over time'}
      className={className}
      showGrid
    />
  )
}
