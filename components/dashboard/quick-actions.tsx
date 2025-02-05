'use client';

import AddIcon from '@mui/icons-material/Add';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import {Box, Card, Stack, Typography, alpha, useTheme} from '@mui/material';
import {motion} from 'framer-motion';
import type {Route} from 'next';
import Link from 'next/link';

const actions = [
  {
    title: 'Add Property',
    description: 'List a new property in your portfolio',
    icon: AddIcon,
    color: 'primary',
    href: '/dashboard/properties/new' as Route,
  },
  {
    title: 'Manage Tenants',
    description: 'View and manage your tenants',
    icon: PeopleIcon,
    color: 'success',
    href: '/dashboard/tenants' as Route,
  },
  {
    title: 'Process Payments',
    description: 'Handle rent payments and invoices',
    icon: AttachMoneyIcon,
    color: 'info',
    href: '/dashboard/payments' as Route,
  },
  {
    title: 'Settings',
    description: 'Configure your account settings',
    icon: SettingsIcon,
    color: 'warning',
    href: '/dashboard/settings' as Route,
  },
] as const;

const containerVariants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  show: {opacity: 1, y: 0},
};

export function QuickActions() {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        bgcolor: 'background.default',
        p: {xs: 2, sm: 3},
      }}
    >
      <Typography
        variant='h6'
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: {xs: '1rem', sm: '1.25rem'},
        }}
      >
        Quick Actions
      </Typography>

      <motion.div variants={containerVariants} initial='hidden' animate='show'>
        <Stack spacing={2}>
          {actions.map(action => (
            <motion.div key={action.title} variants={itemVariants}>
              <Link href={action.href} style={{textDecoration: 'none'}}>
                <Card
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    border: '1px solid',
                    borderColor: alpha(theme.palette[action.color].main, 0.1),
                    bgcolor: alpha(theme.palette[action.color].main, 0.02),
                    '&:hover': {
                      bgcolor: alpha(theme.palette[action.color].main, 0.05),
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[4],
                      borderColor: alpha(theme.palette[action.color].main, 0.2),
                    },
                  }}
                >
                  <Stack direction='row' spacing={2} alignItems='center'>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 1,
                        bgcolor: alpha(theme.palette[action.color].main, 0.12),
                        color: theme.palette[action.color].main,
                      }}
                    >
                      <action.icon size={20} />
                    </Box>
                    <Box sx={{flex: 1}}>
                      <Typography
                        variant='subtitle2'
                        sx={{
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 0.5,
                        }}
                      >
                        {action.title}
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.secondary',
                          fontSize: '0.8125rem',
                        }}
                      >
                        {action.description}
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </Link>
            </motion.div>
          ))}
        </Stack>
      </motion.div>
    </Card>
  );
}
