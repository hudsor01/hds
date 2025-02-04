'use client';

import type {PropertyStats} from '@/types/dashboard';
import {Box, Card, Grid, Tooltip, Typography} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';
import {motion} from 'framer-motion';
import {Box as BoxIcon, DollarSign, TrendingUp, Users} from 'react-feather';

interface DashboardStatsProps {
  stats: PropertyStats;
}

const cardVariants = {
  initial: {scale: 0.96, opacity: 0},
  animate: {scale: 1, opacity: 1},
  hover: {scale: 1.02, transition: {duration: 0.2}},
  tap: {scale: 0.98},
};

const iconVariants = {
  initial: {rotate: -10, scale: 0.9},
  animate: {rotate: 0, scale: 1},
  hover: {rotate: 5, scale: 1.1, transition: {duration: 0.2}},
};

export function DashboardStats({stats}: DashboardStatsProps) {
  const theme = useTheme();

  const items = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: BoxIcon,
      percentageChange: stats.percentageChanges.properties,
      description: 'Total number of properties in your portfolio',
      color: 'primary',
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.12)} 0%, ${alpha(theme.palette.primary.dark, 0.12)} 100%)`,
    },
    {
      title: 'Active Tenants',
      value: stats.activeTenants,
      icon: Users,
      percentageChange: stats.percentageChanges.tenants,
      description: 'Number of current active tenants',
      color: 'success',
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.success.light, 0.12)} 0%, ${alpha(theme.palette.success.dark, 0.12)} 100%)`,
    },
    {
      title: 'Monthly Revenue',
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(stats.monthlyRevenue),
      icon: DollarSign,
      percentageChange: stats.percentageChanges.revenue,
      description: 'Total monthly revenue from all properties',
      color: 'info',
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.info.light, 0.12)} 0%, ${alpha(theme.palette.info.dark, 0.12)} 100%)`,
    },
    {
      title: 'Occupancy Rate',
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      percentageChange: stats.percentageChanges.occupancy,
      description: 'Current occupancy rate across all properties',
      color: 'warning',
      gradient: `linear-gradient(135deg, ${alpha(theme.palette.warning.light, 0.12)} 0%, ${alpha(theme.palette.warning.dark, 0.12)} 100%)`,
    },
  ] as const;

  return (
    <Grid container spacing={{xs: 2, sm: 3}}>
      {items.map((item, index) => (
        <Grid key={item.title} item xs={12} sm={6} md={3}>
          <Tooltip title={item.description} arrow placement='top'>
            <motion.div
              variants={cardVariants}
              initial='initial'
              animate='animate'
              whileHover='hover'
              whileTap='tap'
              transition={{delay: index * 0.1}}
            >
              <Card
                sx={{
                  px: {xs: 2, sm: 3},
                  py: {xs: 3, sm: 4},
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: theme.shadows[2],
                  color: theme.palette[item.color].dark,
                  background: item.gradient,
                  border: '1px solid',
                  borderColor: alpha(theme.palette[item.color].main, 0.2),
                  borderRadius: 2,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    borderColor: alpha(theme.palette[item.color].main, 0.4),
                  },
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
                    marginBottom: theme.spacing(2),
                    background: `linear-gradient(135deg, ${theme.palette[item.color].light} 0%, ${theme.palette[item.color].dark} 100%)`,
                    boxShadow: `0 2px 10px 0 ${alpha(theme.palette[item.color].main, 0.3)}`,
                  }}
                >
                  <item.icon width={24} height={24} color='#fff' />
                </motion.div>

                <Typography
                  variant='h4'
                  sx={{
                    mb: 1,
                    fontWeight: 700,
                    color: theme.palette[item.color].dark,
                    fontSize: {xs: '1.5rem', sm: '1.75rem'},
                  }}
                >
                  {item.value}
                </Typography>

                <Typography
                  variant='subtitle2'
                  sx={{
                    mb: 1,
                    opacity: 0.8,
                    color: theme.palette[item.color].dark,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </Typography>

                <Box
                  component={motion.div}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  transition={{delay: index * 0.1 + 0.2}}
                  sx={{
                    mt: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <TrendingUp
                    width={16}
                    height={16}
                    style={{
                      marginRight: 4,
                      transform: item.percentageChange < 0 ? 'rotate(180deg)' : 'none',
                      color:
                        item.percentageChange >= 0
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    }}
                  />
                  <Typography
                    component='span'
                    variant='subtitle2'
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
  );
}
