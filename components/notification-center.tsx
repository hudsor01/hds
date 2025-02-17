'use client'

import {
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Warning as WarningIcon
} from '@mui/icons-material'
import {
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  type Theme
} from '@mui/material'
import { formatDistanceToNow } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'

export type NotificationType = 'alert' | 'info' | 'warning' | 'success'
export type NotificationCategory = 'maintenance' | 'payment' | 'lease' | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  category: NotificationCategory
}

interface NotificationListProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
}

const NotificationList = ({ notifications, onMarkAsRead }: NotificationListProps) => {
  const getIcon = useCallback((type: NotificationType) => {
    switch (type) {
      case 'alert':
        return <ErrorIcon color="error" />
      case 'warning':
        return <WarningIcon color="warning" />
      case 'success':
        return <CheckCircleIcon color="success" />
      default:
        return <InfoIcon color="info" />
    }
  }, [])

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifications.map(notification => (
        <ListItem
          key={notification.id}
          alignItems="flex-start"
          sx={(theme: Theme) => ({
            borderBottom: 1,
            borderColor: 'divider',
            bgcolor: notification.read ? 'inherit' : theme.palette.action.hover,
            transition: theme.transitions.create('background-color'),
            '&:hover': {
              bgcolor: theme.palette.action.hover
            }
          })}
          secondaryAction={
            <IconButton
              edge="end"
              size="small"
              onClick={() => {
                onMarkAsRead(notification.id)
              }}
            >
              <MoreVertIcon />
            </IconButton>
          }
        >
          <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="subtitle2" component="div">
                {notification.title}
              </Typography>
            }
            secondary={
              <Box component="span" sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </Typography>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  )
}

export const NotificationCenter = () => {
  const [open, setOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)

  // Mock notifications - would come from your notification service/context
  const notifications = useMemo<Notification[]>(
    () => [
      {
        id: '1',
        type: 'alert',
        title: 'Urgent Maintenance Request',
        message: 'Water leak reported at 123 Main St.',
        timestamp: new Date(),
        read: false,
        category: 'maintenance'
      },
      {
        id: '2',
        type: 'success',
        title: 'Payment Received',
        message: 'Rent payment received for 456 Oak Ave.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        category: 'payment'
      },
      {
        id: '3',
        type: 'warning',
        title: 'Lease Expiring Soon',
        message: 'Lease for 789 Pine St expires in 30 days.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        category: 'lease'
      }
    ],
    []
  )

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications])

  const handleMarkAsRead = useCallback((id: string) => {
    // Implement mark as read functionality
    console.log('Marking notification as read:', id)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])
  const handleTabChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }, [])

  const filteredNotifications = useMemo(
    () => (currentTab === 0 ? notifications : notifications.filter(n => !n.read)),
    [currentTab, notifications]
  )

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" onClick={handleOpen}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 400 },
            overflow: 'hidden'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: 2,
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>
          <IconButton onClick={handleClose} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs value={currentTab} onChange={handleTabChange} variant="fullWidth" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tab label="All" />
          <Tab label="Unread" />
        </Tabs>

        <Box sx={{ overflow: 'auto', flexGrow: 1 }}>
          {notifications.length > 0 ? (
            <NotificationList notifications={filteredNotifications} onMarkAsRead={handleMarkAsRead} />
          ) : (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper'
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => {
              // Implement mark all as read functionality
              console.log('Marking all as read')
            }}
          >
            Mark all as read
          </Typography>
        </Box>
      </Drawer>
    </>
  )
}
