'use client'

import type { PropertyStats } from '@/lib/types/dashboard'
import { Box, Card, Grid, Tooltip, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
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
  const theme = useTheme()

  const items = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: BoxIcon,
      percentageChange: stats.percentageChanges.properties,
      description: "Total number of properties in your portfolio",
      color: "primary",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.2)} 0%, ${alpha(theme.palette.primary.dark, 0.2)} 100%)`
    },
    {
      title: "Active Tenants",
      value: stats.activeTenants,
      icon: Users,
      percentageChange: stats.percentageChanges.tenants,
      description: "Number of current active tenants",
      color: "success",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.2)} 0%, ${alpha(theme.palette.success.dark, 0.2)} 100%)`
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
      color: "info",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.info.light, 0.2)} 0%, ${alpha(theme.palette.info.dark, 0.2)} 100%)`
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      percentageChange: stats.percentageChanges.occupancy,
      description: "Current occupancy rate across all properties",
      color: "warning",
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.warning.light, 0.2)} 0%, ${alpha(theme.palette.warning.dark, 0.2)} 100%)`
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
                  boxShadow: 3,
                  color: theme.palette[item.color].dark,
                  background: item.gradient,
                  border: '1px solid',
                  borderColor: alpha(theme.palette[item.color].main, 0.2),
                  borderRadius: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: 16,
                    borderColor: alpha(theme.palette[item.color].main, 0.4),
                  }
                }}
              >
                <motion.div
                  variants={iconVariants}
                  style={{
                    width: 56,
                    height: 56,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                    background: `linear-gradient(135deg, ${theme.palette[item.color].light} 0%, ${theme.palette[item.color].dark} 100%)`,
                    boxShadow: `0 2px 14px 0 ${alpha(theme.palette[item.color].main, 0.3)}`,
                  }}
                >
                  <item.icon width={28} height={28} color="#fff" />
                </motion.div>

                <Typography
                  variant="h3"
                  sx={{
                    mt: 3,
                    mb: 1,
                    fontWeight: 600,
                    color: theme.palette[item.color].dark
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    opacity: 0.72,
                    color: theme.palette[item.color].dark,
                    fontWeight: 500
                  }}
                >
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
                      color: item.percentageChange >= 0 ? theme.palette.success.main : theme.palette.error.main
                    }}
                  />
                  <Typography
                    component="span"
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: item.percentageChange >= 0 ? 'success.main' : 'error.main',
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
