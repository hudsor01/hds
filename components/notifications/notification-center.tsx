// components/notifications/notification-center.tsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NotificationsIcon from '@mui/icons-material/Notifications'
import WarningIcon from '@mui/icons-material/Warning'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'

interface Notification {
  id: string
  type: 'alert' | 'info' | 'warning' | 'success'
  title: string
  message: string
  timestamp: Date
  read: boolean
  category: 'maintenance' | 'payment' | 'lease' | 'system'
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState(0)

  // Mock notifications - would come from your notification service
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      title: 'Urgent Maintenance Request',
      message: 'Water leak reported at 123 Main St.',
      timestamp: new Date(),
      read: false,
      category: 'maintenance',
    },
    {
      id: '2',
      type: 'success',
      title: 'Payment Received',
      message: 'Rent payment received for 456 Oak Ave.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      category: 'payment',
    },
    {
      id: '3',
      type: 'warning',
      title: 'Lease Expiring Soon',
      message: 'Lease for 789 Pine St expires in 30 days.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      category: 'lease',
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification['type']) => {
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
  }

  const handleMarkAsRead = (id: string) => {
    // Implement mark as read functionality
    console.log('Marking notification as read:', id)
  }

  const NotificationList = ({ notifications }: { notifications: Notification[] }) => (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {notifications.map((notification) => (
        <ListItem
          key={notification.id}
          alignItems="flex-start"
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: notification.read ? 'inherit' : 'action.hover',
          }}
          secondaryAction={
            <IconButton edge="end" size="small" onClick={() => handleMarkAsRead(notification.id)}>
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
              <>
                <Typography variant="body2" color="text.secondary">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDistanceToNow(notification.timestamp, {
                    addSuffix: true,
                  })}
                </Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  )

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 } },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            p: 2,
            alignItems: 'center',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="All" />
          <Tab label="Unread" />
        </Tabs>

        <Box sx={{ overflow: 'auto' }}>
          <NotificationList
            notifications={currentTab === 0 ? notifications : notifications.filter((n) => !n.read)}
          />

          {notifications.length === 0 && (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography color="text.secondary">No notifications</Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
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
