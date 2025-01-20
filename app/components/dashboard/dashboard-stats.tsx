'use client'

import type { PropertyStats } from '@/lib/types/dashboard'
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { motion } from 'framer-motion'
import { Box as BoxIcon, DollarSign, TrendingUp, Users } from 'react-feather'

interface DashboardStatsProps {
  stats: PropertyStats
}

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
}

const iconVariants = {
  initial: { rotate: -10, scale: 0.9 },
  animate: { rotate: 0, scale: 1 },
  hover: { rotate: 10, scale: 1.1 }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const items = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: BoxIcon,
      percentageChange: stats.percentageChanges.properties,
      description: "Total number of properties in your portfolio",
      color: "primary"
    },
    {
      title: "Active Tenants",
      value: stats.activeTenants,
      icon: Users,
      percentageChange: stats.percentageChanges.tenants,
      description: "Number of current active tenants",
      color: "success"
    },
    {
      title: "Monthly Revenue",
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(stats.monthlyRevenue),
      icon: DollarSign,
      percentageChange: stats.percentageChanges.revenue,
      description: "Total monthly revenue from all properties",
      color: "info"
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      percentageChange: stats.percentageChanges.occupancy,
      description: "Current occupancy rate across all properties",
      color: "warning"
    }
  ] as const

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.title} item xs={12} sm={6} md={3}>
          <Tooltip title={item.description} arrow placement="top">
            <motion.div
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Card
                sx={{
                  px: 3,
                  py: 4,
                  boxShadow: 0,
                  textAlign: 'center',
                  color: `${item.color}.darker`,
                  bgcolor: `${item.color}.lighter`,
                  border: '1px solid',
                  borderColor: `${item.color}.light`,
                  borderRadius: 2,
                }}
              >
                <motion.div
                  variants={iconVariants}
                  style={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    background: alpha('#000', 0.12),
                    color: `${item.color}.dark`,
                  }}
                >
                  <item.icon width={24} height={24} />
                </motion.div>

                <Typography variant="h3" sx={{ mt: 3, mb: 1 }}>
                  {item.value}
                </Typography>

                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                  {item.title}
                </Typography>

                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  sx={{
                    mt: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUp
                    width={16}
                    height={16}
                    style={{
                      marginRight: 4,
                      transform: item.percentageChange < 0 ? 'rotate(180deg)' : 'none',
                      color: item.percentageChange >= 0 ? '#16a34a' : '#dc2626'
                    }}
                  />
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{
                      color: item.percentageChange >= 0 ? 'success.dark' : 'error.dark',
                    }}
                  >
                    {Math.abs(item.percentageChange)}%
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  )
}
