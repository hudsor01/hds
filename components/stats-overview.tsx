'use client'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import BuildIcon from '@mui/icons-material/Build'
import GroupIcon from '@mui/icons-material/Group'
import HomeIcon from '@mui/icons-material/Home'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import type { StatCardProps } from '@/types/components'

const iconStyle = { fontSize: 40, color: 'primary.main', opacity: 0.7 }

function StatCard({ title, value, trend, icon: Icon, trendLabel }: StatCardProps) {
  const isPositive = Number(trend) >= 0

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isPositive ? 'success.main' : 'error.main',
                display: 'flex',
                alignItems: 'center',
                mt: 1
              }}
            >
              {isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
              <span style={{ marginLeft: 4 }}>
                {trend}% {trendLabel}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', '& svg': iconStyle }}>
            <Icon />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export function StatsOverview() {
  const stats = [
    {
      title: 'Total Properties',
      value: '12',
      trend: '8.5',
      icon: HomeIcon,
      trendLabel: 'vs last month',
      trendDirection: 'up'
    },
    {
      title: 'Total Revenue',
      value: '$24,500',
      trend: '12.3',
      icon: AttachMoneyIcon,
      trendLabel: 'vs last month',
      trendDirection: 'up'
    },
    {
      title: 'Total Users',
      value: '28',
      trend: '5.2',
      icon: GroupIcon,
      trendLabel: 'vs last month',
      trendDirection: 'up'
    },
    {
      title: 'Total Issues',
      value: '5',
      trend: '-2.4',
      icon: BuildIcon,
      trendLabel: 'vs last month',
      trendDirection: 'down'
    }
  ]
  return (
    <Grid container spacing={3}>
      {stats.map(stat => (
        <Grid key={stat.title} item xs={12} sm={6} md={3}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  )
}
