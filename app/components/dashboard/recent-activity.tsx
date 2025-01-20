'use client'

import type { RecentActivity } from "@/lib/types/dashboard"
import { Box, Chip, Divider, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { alpha, useTheme } from "@mui/material/styles"
import { motion } from "framer-motion"
import { useState } from "react"
import { AlertTriangle, Check, Clock, DollarSign, FileText, User } from "react-feather"

interface RecentActivityListProps {
  activities: RecentActivity[]
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 }
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  const theme = useTheme()
  const [filter, setFilter] = useState<'ALL' | 'APPLICATION' | 'MAINTENANCE' | 'PAYMENT'>('ALL')

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'APPLICATION':
        return User
      case 'MAINTENANCE':
        return AlertTriangle
      case 'PAYMENT':
        return DollarSign
      default:
        return FileText
    }
  }

  const getStatusColor = (status: RecentActivity['status']): 'success' | 'warning' | 'info' => {
    switch (status) {
      case 'COMPLETED':
        return 'success'
      case 'IN_PROGRESS':
        return 'warning'
      case 'PENDING':
        return 'info'
      default:
        return 'info'
    }
  }

  const filteredActivities = activities.filter(
    activity => filter === 'ALL' || activity.type === filter
  )

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6">Recent Activity</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={filter}
          onChange={(_, value) => value && setFilter(value)}
          sx={{
            '& .MuiToggleButton-root': {
              px: 2,
              py: 0.5,
              typography: 'body2',
              borderRadius: '16px !important',
              borderColor: 'divider',
              '&.Mui-selected': {
                bgcolor: theme => alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                borderColor: 'primary.main',
              },
            },
          }}
        >
          <ToggleButton value="ALL">All</ToggleButton>
          <ToggleButton value="APPLICATION">Applications</ToggleButton>
          <ToggleButton value="MAINTENANCE">Maintenance</ToggleButton>
          <ToggleButton value="PAYMENT">Payments</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {filteredActivities.length === 0 ? (
          <Box
            sx={{
              py: 10,
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: theme => alpha(theme.palette.primary.main, 0.04),
            }}
          >
            <Clock size={40} style={{ marginBottom: 16, opacity: 0.5 }} />
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              No recent activities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New activities will appear here
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2} divider={<Divider />}>
            {filteredActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type)
              const statusColor = getStatusColor(activity.status)

              return (
                <motion.div key={activity.id} variants={itemVariants}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: theme => alpha(theme.palette[statusColor].main, 0.1),
                        color: `${statusColor}.main`,
                      }}
                    >
                      <Icon size={20} />
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                        {activity.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {activity.description}
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ typography: 'caption', color: 'text.secondary' }}
                      >
                        <Box component="span">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </Box>
                        <Chip
                          size="small"
                          icon={activity.status === 'COMPLETED' ? <Check size={12} /> : undefined}
                          label={activity.status.replace('_', ' ')}
                          color={statusColor}
                          variant="outlined"
                          sx={{
                            height: 24,
                            fontSize: '0.75rem',
                            '& .MuiChip-icon': { fontSize: 'inherit' }
                          }}
                        />
                        {activity.amount && (
                          <Box
                            component="span"
                            sx={{
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              typography: 'caption',
                              bgcolor: 'success.lighter',
                              color: 'success.dark',
                            }}
                          >
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(activity.amount)}
                          </Box>
                        )}
                      </Stack>
                    </Box>

                    <IconButton size="small" sx={{ color: 'text.secondary' }}>
                      <FileText size={16} />
                    </IconButton>
                  </Stack>
                </motion.div>
              )
            })}
          </Stack>
        )}
      </motion.div>
    </Box>
  )
}
