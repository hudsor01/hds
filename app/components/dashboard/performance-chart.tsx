'use client'

import { Paper, Skeleton, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

const Chart = dynamic(
  () => import('./chart').then(mod => mod.Chart),
  {
    ssr: false,
    loading: () => (
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height={300}
        sx={{ borderRadius: 2 }}
      />
    ),
  }
)

interface PerformanceChartProps {
  data: Array<{
    name: string
    value: number
  }>
  title?: string
}

export function PerformanceChart({ data, title }: PerformanceChartProps) {
  const chartData = useMemo(() => data, [data])

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Chart data={chartData} />
    </Paper>
  )
}
