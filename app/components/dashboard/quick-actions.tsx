'use client'

import { Box, Button, Grid, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import type { Route } from 'next'
import Link from 'next/link'
import { Home, Plus, Settings, Users } from 'react-feather'

const actions = [
  {
    title: 'Add Property',
    description: 'List a new property in your portfolio',
    href: '/dashboard/properties/new' as Route,
    icon: Plus,
    color: 'primary'
  },
  {
    title: 'Manage Tenants',
    description: 'View and manage your tenants',
    href: '/dashboard/tenants' as Route,
    icon: Users,
    color: 'info'
  },
  {
    title: 'Process Payments',
    description: 'Handle rent payments and invoices',
    href: '/dashboard/payments' as Route,
    icon: Home,
    color: 'success'
  },
  {
    title: 'Settings',
    description: 'Configure your account settings',
    href: '/dashboard/settings' as Route,
    icon: Settings,
    color: 'warning'
  }
] as const

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  hover: { y: -4, transition: { duration: 0.2 } }
}

export function QuickActions() {
  const theme = useTheme()

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid key={action.title} item xs={12} sm={6}>
            <motion.div variants={itemVariants} whileHover="hover">
              <Link href={action.href} style={{ textDecoration: 'none' }}>
                <Button
                  fullWidth
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    textAlign: 'left',
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${alpha(theme.palette[action.color].light, 0.1)} 0%, ${alpha(theme.palette[action.color].dark, 0.1)} 100%)`,
                    border: '1px solid',
                    borderColor: alpha(theme.palette[action.color].main, 0.2),
                    color: theme.palette[action.color].dark,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette[action.color].light, 0.2)} 0%, ${alpha(theme.palette[action.color].dark, 0.2)} 100%)`,
                      borderColor: alpha(theme.palette[action.color].main, 0.4),
                      transform: 'translateY(-4px)',
                      boxShadow: `0 4px 12px ${alpha(theme.palette[action.color].main, 0.2)}`
                    }
                  }}
                >
                  <Box
                    sx={{
                      mb: 1,
                      width: 40,
                      height: 40,
                      display: 'flex',
                      borderRadius: '50%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${theme.palette[action.color].light} 0%, ${theme.palette[action.color].dark} 100%)`,
                      boxShadow: `0 2px 10px ${alpha(theme.palette[action.color].main, 0.3)}`,
                    }}
                  >
                    <action.icon size={20} color="#fff" />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      mb: 0.5,
                      fontWeight: 600,
                      color: theme.palette[action.color].dark
                    }}
                  >
                    {action.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.72,
                      color: theme.palette[action.color].dark,
                      fontWeight: 500
                    }}
                  >
                    {action.description}
                  </Typography>
                </Button>
              </Link>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  )
}
