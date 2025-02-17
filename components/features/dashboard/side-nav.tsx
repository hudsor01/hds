'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, List, ListItem, ListItemIcon, ListItemText, Paper, styled } from '@mui/material'
import {
  Home as HomeIcon,
  Apartment as BuildingIcon,
  Description as FileTextIcon,
  People as UsersIcon,
  Build as WrenchIcon,
  Folder as FileBoxIcon,
  Email as MailIcon,
  BarChart as BarChartIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

const routes = [
  {
    label: 'Overview',
    icon: HomeIcon,
    href: '/dashboard'
  },
  {
    label: 'Properties',
    icon: BuildingIcon,
    href: '/dashboard/properties'
  },
  {
    label: 'Leases',
    icon: FileTextIcon,
    href: '/dashboard/leases'
  },
  {
    label: 'Tenants',
    icon: UsersIcon,
    href: '/dashboard/tenants'
  },
  {
    label: 'Maintenance',
    icon: WrenchIcon,
    href: '/dashboard/maintenance'
  },
  {
    label: 'Documents',
    icon: FileBoxIcon,
    href: '/dashboard/documents'
  },
  {
    label: 'Messages',
    icon: MailIcon,
    href: '/dashboard/messages'
  },
  {
    label: 'Reports',
    icon: BarChartIcon,
    href: '/dashboard/reports'
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/dashboard/settings'
  }
]

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText
    }
  }
}))

export function SideNav() {
  const pathname = usePathname()

  return (
    <Paper
      elevation={0}
      sx={{
        width: 240,
        height: '100%',
        borderRight: 1,
        borderColor: 'divider',
        borderRadius: 0
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {routes.map(route => {
            const Icon = route.icon
            const isActive = pathname === route.href

            return (
              <Link key={route.href} href={route.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <StyledListItem className={isActive ? 'active' : ''} sx={{ px: 2, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={route.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: isActive ? 500 : 400
                    }}
                  />
                </StyledListItem>
              </Link>
            )
          })}
        </List>
      </Box>
    </Paper>
  )
}
