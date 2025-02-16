'use client'

import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  isLoading?: boolean
}

export default function MetricCard({ title, value, icon, trend, isLoading }: MetricCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Skeleton variant="text" width="60%" height={40} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom className="flex items-center gap-2">
          {icon}
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
        {trend && (
          <Typography
            color={trend.direction === 'up' ? 'success.main' : 'error.main'}
            className="mt-1 flex items-center gap-1 text-sm"
          >
            {trend.direction === 'up' ? '↑' : '↓'}
            {trend.value}%
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
