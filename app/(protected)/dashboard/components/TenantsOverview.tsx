'use client';

import { Card, CardContent, Box, Typography, Avatar, IconButton, Chip, Stack, useTheme, alpha } from '@mui/material';
import { MoreVert as MoreVertIcon, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

// This would come from your API/database
const tenantStats = {
  totalTenants: 48,
  activeLeases: 45,
  occupancyRate: 94,
  upcomingRenewals: 3,
  changeFromLastMonth: 2,
  recentTenants: [
    {
      id: 1,
      name: 'Sarah Johnson',
      unit: 'A101',
      moveInDate: '2024-02-01',
      status: 'active',
      image: '/sarah.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      unit: 'B205',
      moveInDate: '2024-01-15',
      status: 'active',
      image: '/team/michael.jpg'
    },
    {
      id: 3,
      name: 'Emily Davis',
      unit: 'C304',
      moveInDate: '2024-01-01',
      status: 'active',
      image: '/team/emily.jpg'
    }
  ]
};

export function TenantsOverview() {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Tenants Overview
          </Typography>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 3
          }}
        >
          {/* Total Tenants */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Total Tenants
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              {tenantStats.totalTenants}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <TrendingUpIcon 
                sx={{ 
                  fontSize: 16, 
                  color: 'success.main',
                  mr: 0.5 
                }} 
              />
              <Typography variant="caption" color="success.main">
                +{tenantStats.changeFromLastMonth} this month
              </Typography>
            </Box>
          </Box>

          {/* Occupancy Rate */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.success.main, 0.1),
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Occupancy Rate
            </Typography>
            <Typography variant="h4" fontWeight="bold" color="success.main">
              {tenantStats.occupancyRate}%
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {tenantStats.activeLeases} active leases
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Recent Tenants */}
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Recent Tenants
        </Typography>
        <Stack spacing={2}>
          {tenantStats.recentTenants.map((tenant) => (
            <motion.div
              key={tenant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }
                }}
              >
                <Avatar 
                  src={tenant.image} 
                  alt={tenant.name}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">
                    {tenant.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Unit {tenant.unit} • Moved in {new Date(tenant.moveInDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Chip 
                  label={tenant.status}
                  size="small"
                  color="success"
                  sx={{ 
                    textTransform: 'capitalize',
                    fontWeight: 500
                  }}
                />
              </Box>
            </motion.div>
          ))}
        </Stack>

        {/* Upcoming Renewals Alert */}
        {tenantStats.upcomingRenewals > 0 && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: alpha(theme.palette.warning.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="warning.main" fontWeight="bold">
                Upcoming Renewals
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {tenantStats.upcomingRenewals} leases due for renewal
              </Typography>
            </Box>
            <IconButton size="small" color="warning">
              <MoreVertIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
