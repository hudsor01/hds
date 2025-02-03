import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import {format} from 'date-fns';

interface Notification {
  id: string;
  type: 'maintenance' | 'payment' | 'property';
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationsMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

export function NotificationsMenu({anchorEl, onClose}: NotificationsMenuProps) {
  // This would normally come from your notifications service
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'maintenance',
      message: 'New maintenance request for 123 Main St',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      message: 'Rent payment received for 456 Oak Ave',
      timestamp: new Date(),
      read: false,
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'maintenance':
        return <BuildIcon fontSize='small' />;
      case 'payment':
        return <PaymentIcon fontSize='small' />;
      case 'property':
        return <HomeIcon fontSize='small' />;
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 360,
          maxHeight: 400,
        },
      }}
    >
      <Box sx={{p: 2, borderBottom: 1, borderColor: 'divider'}}>
        <Typography variant='h6'>Notifications</Typography>
      </Box>

      {notifications.map(notification => (
        <MenuItem
          key={notification.id}
          onClick={onClose}
          sx={{
            py: 2,
            px: 3,
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: notification.read ? 'inherit' : 'action.hover',
          }}
        >
          <ListItemIcon>{getIcon(notification.type)}</ListItemIcon>
          <Box sx={{ml: 2}}>
            <Typography variant='body2'>{notification.message}</Typography>
            <Typography variant='caption' color='text.secondary' sx={{mt: 0.5}}>
              {format(notification.timestamp, 'PPp')}
            </Typography>
          </Box>
        </MenuItem>
      ))}

      {notifications.length === 0 && (
        <MenuItem disabled>
          <Typography variant='body2' color='text.secondary'>
            No new notifications
          </Typography>
        </MenuItem>
      )}
    </Menu>
  );
}
