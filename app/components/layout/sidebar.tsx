'use client'

import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material'
import { alpha, styled, useTheme } from '@mui/material/styles'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, Box as BoxIcon, FileText, Home, Settings, Tool, Users } from 'react-feather'

const DRAWER_WIDTH = 260

const menuItems = [
  { title: 'Dashboard', path: '/dashboard', icon: Home },
  { title: 'Properties', path: '/dashboard/properties', icon: BoxIcon },
  { title: 'Tenants', path: '/dashboard/tenants', icon: Users },
  { title: 'Maintenance', path: '/dashboard/maintenance', icon: Tool },
  { title: 'Documents', path: '/dashboard/documents', icon: FileText },
  { title: 'Analytics', path: '/dashboard/analytics', icon: BarChart2 },
  { title: 'Settings', path: '/dashboard/settings', icon: Settings }
] as const

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const MenuListItem = styled(ListItemButton)(({ theme }) => ({
  marginBottom: 2,
  borderRadius: theme.shape.borderRadius,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
  },
}))

const containerVariants = {
  initial: { x: -DRAWER_WIDTH },
  animate: { x: 0, transition: { duration: 0.3 } }
}

const listVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 }
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const theme = useTheme()
  const pathname = usePathname()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const content = (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Logo Section */}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              width: 35,
              height: 35,
              borderRadius: 1,
              bgcolor: theme => alpha(theme.palette.primary.main, 0.12),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={24}
              height={24}
              style={{ opacity: 0.87 }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
            HDS Admin
          </Typography>
        </Stack>
      </Box>

      {/* Menu Items */}
      <Box sx={{ px: 2, flex: 1 }}>
        <List
          component={motion.ul}
          variants={listVariants}
          sx={{ '& .MuiListItemIcon-root': { minWidth: 36 } }}
        >
          {menuItems.map((item) => (
            <motion.li key={item.path} variants={itemVariants}>
              <MenuListItem
                // @ts-expect-error - MUI hasn't properly typed the component prop
                component={Link}
                href={item.path}
                selected={pathname === item.path}
                onClick={isMobile ? onClose : undefined}
              >
                <ListItemIcon>
                  <item.icon size={20} />
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: pathname === item.path ? 600 : 500,
                  }}
                />
              </MenuListItem>
            </motion.li>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: theme => alpha(theme.palette.primary.main, 0.04),
            border: '1px dashed',
            borderColor: 'primary.main',
          }}
        >
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Image
              src="/illustration_rocket.png"
              alt="Upgrade"
              width={100}
              height={100}
              style={{ opacity: 0.87 }}
            />
            <div>
              <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                Upgrade to Pro
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get access to premium features
              </Typography>
            </div>
          </Stack>
        </Box>
      </Box>
    </Box>
  )

  return isMobile ? (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: { xs: 'block', lg: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: DRAWER_WIDTH,
          borderRight: '1px dashed',
          borderColor: 'divider',
          backgroundImage: 'none',
          boxShadow: 'inherit',
        },
      }}
    >
      {content}
    </Drawer>
  ) : (
    <Box
      component="nav"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
            borderRight: '1px dashed',
            borderColor: 'divider',
            backgroundImage: 'none',
            boxShadow: 'inherit',
          },
        }}
        open
      >
        {content}
      </Drawer>
    </Box>
  )
}
