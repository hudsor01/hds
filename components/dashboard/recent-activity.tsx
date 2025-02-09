'use client'

import type { RecentActivity } from '@/types/dashboard'
import {
  Box,
  Card,
  Chip,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { AlertTriangle, Clock, DollarSign, ExternalLink, FileText, User } from 'react-feather'

interface RecentActivityListProps {
  activities: RecentActivity[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
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
    (activity) => filter === 'ALL' || activity.type === filter
  )

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Recent Activity
          </Typography>
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
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                  },
                },
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                },
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
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                },
              }}
            >
              <FileText size={20} />
            </IconButton>
          </Box>
        </Stack>

        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {filteredActivities.length === 0 ? (
            <Box
              sx={{
                py: 8,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
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
            <Stack spacing={2}>
              {filteredActivities.map((activity) => {
                const Icon = getActivityIcon(activity.type)
                const statusColor = getStatusColor(activity.status)

                return (
                  <motion.div key={activity.id} variants={itemVariants}>
                    <Card
                      variant="outlined"
                      sx={{
                        p: 2,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          bgcolor: alpha(theme.palette[statusColor].main, 0.02),
                          borderColor: alpha(theme.palette[statusColor].main, 0.2),
                        },
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="flex-start">
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 1,
                            bgcolor: (theme) => alpha(theme.palette[statusColor].main, 0.12),
                            color: `${statusColor}.main`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
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
                              overflow: 'hidden',
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
                              overflow: 'hidden',
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
                              gap: 1,
                            }}
                          >
                            <Box component="span">
                              {new Date(activity.timestamp).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                              })}
                            </Box>
                            <Chip
                              label={activity.status.replace('_', ' ')}
                              size="small"
                              color={statusColor}
                              variant="outlined"
                              sx={{
                                height: 20,
                                fontSize: '0.75rem',
                                fontWeight: 500,
                              }}
                            />
                            {activity.amount && (
                              <Typography
                                component="span"
                                sx={{
                                  fontWeight: 600,
                                  color:
                                    statusColor === 'success' ? 'success.main' : 'text.primary',
                                }}
                              >
                                ${activity.amount.toLocaleString()}
                              </Typography>
                            )}
                          </Stack>
                        </Box>

                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'primary.main',
                                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                              },
                            }}
                          >
                            <ExternalLink size={16} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Card>
                  </motion.div>
                )
              })}
            </Stack>
          )}
        </motion.div>
      </Box>
    </Card>
  )
}
