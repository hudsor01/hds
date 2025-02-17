'use client'

import { Box, Tooltip, Typography, alpha, useTheme } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { motion } from 'framer-motion'
import React from 'react'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: 'primary' | 'success' | 'info' | 'warning'
  percentageChange?: number
  tooltip?: string
  formatType?: 'currency' | 'number' | 'percentage'
}

const cardVariants = {
  initial: { scale: 0.96, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
}

const iconVariants = {
  initial: { rotate: -10, scale: 0.9 },
  animate: { rotate: 0, scale: 1 },
  hover: { rotate: 5, scale: 1.1, transition: { duration: 0.2 } }
}

export function MetricCard({
  title,
  value,
  icon,
  color,
  percentageChange,
  tooltip,
  formatType = 'number'
}: MetricCardProps) {
  const theme = useTheme()

  const formattedValue = React.useMemo(() => {
    switch (formatType) {
      case 'currency':
        return `$${Number(value).toLocaleString()}`
      case 'percentage':
        return `${Number(value)}%`
      default:
        return String(value)
    }
  }, [value, formatType])

  return (
    <Tooltip title={tooltip || ''} arrow placement="top">
      <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover" whileTap="tap">
        <MuiCard
          sx={{
            p: { xs: 1.5, sm: 2 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: theme.shadows[2],
            color: theme.palette[color].dark,
            background: `linear-gradient(135deg, ${alpha(theme.palette[color].light, 0.12)} 0%, ${alpha(theme.palette[color].dark, 0.12)} 100%)`,
            border: '1px solid',
            borderColor: alpha(theme.palette[color].main, 0.2),
            borderRadius: 2,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: theme.shadows[8],
              borderColor: alpha(theme.palette[color].main, 0.4)
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, gap: 1.5 }}>
            <motion.div
              variants={iconVariants}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                borderRadius: '50%',
                alignItems: 'center',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${theme.palette[color].light} 0%, ${theme.palette[color].dark} 100%)`,
                boxShadow: `0 2px 8px 0 ${alpha(theme.palette[color].main, 0.3)}`
              }}
            >
              {icon}
            </motion.div>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette[color].dark,
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              {formattedValue}
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.8,
              color: theme.palette[color].dark,
              fontWeight: 500,
              mb: 0.5
            }}
          >
            {title}
          </Typography>

          {percentageChange !== undefined && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{
                mt: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
              }}
            >
              <TrendingUp
                size={14}
                style={{
                  transform: percentageChange < 0 ? 'rotate(180deg)' : 'none',
                  color: percentageChange >= 0 ? theme.palette.success.main : theme.palette.error.main
                }}
              />
              <Typography
                component="span"
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: percentageChange >= 0 ? 'success.main' : 'error.main'
                }}
              >
                {Math.abs(percentageChange)}%
              </Typography>
            </Box>
          )}
        </MuiCard>
      </motion.div>
    </Tooltip>
  )
}
