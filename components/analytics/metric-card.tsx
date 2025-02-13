'use client'

import { Trend } from '@/types'
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { ArrowDownRight, ArrowUpRight, Minus } from 'react-feather'

export interface MetricCardProps {
  title: string
  value: number | string
  trend?: Trend
  loading?: boolean
  error?: Error
  icon?: React.ReactNode
  format?: 'number' | 'currency' | 'percentage'
}

export default function MetricCard({
  title,
  value,
  loading = false,
  error,
  icon,
  trend,
  format = 'number'
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(val)
      case 'percentage':
        return `${val}%`
      default:
        return new Intl.NumberFormat('en-US').format(val)
    }
  }

  const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return '#10B981' // green
      case 'down':
        return '#EF4444' // red
      default:
        return '#6B7280' // gray
    }
  }

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return <ArrowUpRight size={20} />
      case 'down':
        return <ArrowDownRight size={20} />
      default:
        return <Minus size={20} />
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          </Box>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'action.hover'
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {error ? (
          <Typography color="error" variant="body2">
            {error.message}
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <Typography variant="h4" component="div">
              {value !== null ? formatValue(value) : 'N/A'}
            </Typography>
            {trend && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: getTrendColor(trend.direction),
                  mb: 0.5
                }}
              >
                {getTrendIcon(trend.direction)}
                <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
                  {trend.value}%
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
