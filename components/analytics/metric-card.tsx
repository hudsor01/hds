'use client'

import { Trend } from '@/types/analytics'
import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { ArrowDownRight, ArrowUpRight } from 'react-feather'

export interface MetricCardProps {
  title: string
  value: number
  isLoading?: boolean
  icon?: React.ReactNode
  trend?: Trend
  format?: 'number' | 'currency' | 'percentage'
}

export default function MetricCard({
  title,
  value,
  isLoading = false,
  icon,
  trend,
  format = 'number',
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
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
                backgroundColor: 'action.hover',
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', height: 48 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <Typography variant="h4" component="div">
              {formatValue(value)}
            </Typography>
            {trend && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: getTrendColor(trend.direction),
                  mb: 0.5,
                }}
              >
                {trend.direction === 'up' ? (
                  <ArrowUpRight size={20} />
                ) : trend.direction === 'down' ? (
                  <ArrowDownRight size={20} />
                ) : null}
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
