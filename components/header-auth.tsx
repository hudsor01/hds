'use client'

import { useState } from 'react'
import { 
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Skeleton 
} from '@mui/material'
import { 
  Settings,
  User,
  LogOut,
  Building,
  FileText,
  Bell,
  HelpCircle
} from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface HeaderAuthProps {
  className?: string
  hideNotifications?: boolean
  hideHelp?: boolean
}

export function HeaderAuth({ 
  className,
  hideNotifications = false,
  hideHelp = false
}: HeaderAuthProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, signOut, isLoading } = useAuth()
  const router = useRouter()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/sign-in')
      toast.success('Signed out successfully')
    } catch (error) {
      toast.error('Error signing out')
    }
    handleMenuClose()
  }

  if (isLoading) {
    return (
      <Box className={cn('flex items-center gap-4', className)}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={100} />
      </Box>
    )
  }

  if (!user) {
    return (
      <Box className={cn('flex items-center gap-3', className)}>
        <Button
          component={Link}
          href="/sign-in"
          variant="outlined"
          color="primary"
          size="small"
        >
          Sign In
        </Button>
        <Button
          component={Link}
          href="/sign-up"
          variant="contained"
          color="primary"
          size="small"
        >
          Get Started
        </Button>
      </Box>
    )
  }

  return (
    <Box className={cn('flex items-center gap-3', className)}>
      {!hideHelp && (
        <Tooltip title="Help & Resources">
          <IconButton
            color="inherit"
            component={Link}
            href="/help"
            className="text-muted-foreground hover:text-primary"
          >
            <HelpCircle className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )}

      {!hideNotifications && (
        <Tooltip title="Notifications">
          <IconButton
            color="inherit"
            component={Link}
            href="/notifications"
            className="text-muted-foreground hover:text-primary"
          >
            <Bell className="h-5 w-5" />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Account settings">
        <IconButton
          onClick={handleMenuOpen}
          size="small"
          className="ml-2"
          aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        >
          <Avatar
            alt={user.name || user.email}
            src={user.imageUrl}
            className="h-8 w-8 text-primary bg-primary/10"
          >
            {user.name?.[0] || user.email?.[0]}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        className="mt-2"
      >
        <Box className="px-4 py-2">
          <Typography variant="subtitle2" className="font-medium">
            {user.name}
          </Typography>
          <Typography variant="body2" className="text-muted-foreground">
            {user.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem component={Link} href="/profile">
          <ListItemIcon>
            <User className="h-4 w-4" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem component={Link} href="/properties">
          <ListItemIcon>
            <Building className="h-4 w-4" />
          </ListItemIcon>
          <ListItemText>Properties</ListItemText>
        </MenuItem>

        <MenuItem component={Link} href="/documents">
          <ListItemIcon>
            <FileText className="h-4 w-4" />
          </ListItemIcon>
          <ListItemText>Documents</ListItemText>
        </MenuItem>

        <MenuItem component={Link} href="/settings">
          <ListItemIcon>
            <Settings className="h-4 w-4" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSignOut} className="text-red-600">
          <ListItemIcon>
            <LogOut className="h-4 w-4 text-red-600" />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}