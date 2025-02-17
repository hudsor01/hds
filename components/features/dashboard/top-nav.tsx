'use client'

import { UserNav } from '@/components/dashboard/user-nav'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material'
import { Apartment as BuildingIcon } from '@mui/icons-material'
import { Breadcrumbs } from './breadcrumbs'

export function TopNav() {
  const theme = useTheme()

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={0}
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ height: 64 }}>
        <Link
          href="/dashboard"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <BuildingIcon sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
            HDS Platform
          </Typography>
        </Link>

        <Box sx={{ ml: 2, flex: 1 }}>
          <Breadcrumbs />
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
          <ModeToggle />
          <UserNav />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
