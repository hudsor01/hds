'use client'

import type { RecentActivity } from "@/lib/types/dashboard"
import { Box, Divider, IconButton, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { alpha, useTheme } from "@mui/material/styles"
import { motion } from "framer-motion"
import { useState } from "react"
import { AlertTriangle, Clock, DollarSign, FileText, User } from "react-feather"

interface RecentActivityListProps {
  activities: RecentActivity[]
}

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

const itemVariants = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.2 } }
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
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Activity</Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={filter}
          onChange={(_, value) => value && setFilter(value)}
          sx={{
            display: { xs: 'none', sm: 'flex' },
            '& .MuiToggleButton-root': {
              px: 2,
              py: 0.5,
              typography: 'body2',
              borderRadius: '16px !important',
              borderColor: 'divider',
              '&.Mui-selected': {
                bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: theme => alpha(theme.palette.primary.main, 0.12),
                }
              },
              '&:hover': {
                bgcolor: theme => alpha(theme.palette.primary.main, 0.04),
              }
            },
          }}
        >
          <ToggleButton value="ALL">All</ToggleButton>
          <ToggleButton value="APPLICATION">Applications</ToggleButton>
          <ToggleButton value="MAINTENANCE">Maintenance</ToggleButton>
          <ToggleButton value="PAYMENT">Payments</ToggleButton>
        </ToggleButtonGroup>

        {/* Mobile Filter Menu */}
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            size="small"
            sx={{
              color: 'primary.main',
              bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: theme => alpha(theme.palette.primary.main, 0.12),
              }
            }}
          >
            <FileText size={20} />
          </IconButton>
        </Box>
      </Stack>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {filteredActivities.length === 0 ? (
          <Box
            sx={{
              py: 8,
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: theme => alpha(theme.palette.primary.main, 0.04),
            }}
          >
            <Clock size={32} style={{ marginBottom: 16, opacity: 0.5 }} />
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              No recent activities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New activities will appear here
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2.5} divider={<Divider />}>
            {filteredActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type)
              const statusColor = getStatusColor(activity.status)

              return (
                <motion.div key={activity.id} variants={itemVariants}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: '50%',
                        bgcolor: theme => alpha(theme.palette[statusColor].main, 0.12),
                        color: `${statusColor}.main`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Icon size={20} />
                    </Box>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          mb: 0.5,
                          fontWeight: 600,
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {activity.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {activity.description}
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{
                          typography: 'caption',
                          color: 'text.secondary',
                          flexWrap: 'wrap',
                          gap: 1
                        }}
                      >
                        <Box component="span">
                          {new Date(activity.timestamp).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                          })}
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            typography: 'caption',
                            fontWeight: 600,
                            bgcolor: `${statusColor}.soft`,
                            color: `${statusColor}.main`,
                          }}
                        >
                          {activity.status.replace('_', ' ')}
                        </Box>
                        {activity.amount && (
                          <Box component="span" sx={{ fontWeight: 600 }}>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(activity.amount)}
                          </Box>
                        )}
                      </Stack>
                    </Box>

                    <IconButton
                      size="small"
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
                        }
                      }}
                    >
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
