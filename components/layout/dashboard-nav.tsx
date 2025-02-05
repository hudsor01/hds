import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {BarChart2, Home, Settings, Users} from 'react-feather';

interface DashboardNavProps {
  collapsed: boolean;
}

const items = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: Home,
  },
  {
    title: 'Properties',
    path: '/dashboard/properties',
    icon: BarChart2,
  },
  {
    title: 'Tenants',
    path: '/dashboard/tenants',
    icon: Users,
  },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
  },
];

export function DashboardNav({collapsed}: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <Box>
      <List>
        {items.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <Link
                href={item.path}
                style={{width: '100%', textDecoration: 'none', color: 'inherit'}}
              >
                <Tooltip title={collapsed ? item.title : ''} placement='right'>
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      justifyContent: collapsed ? 'center' : 'flex-start',
                      py: collapsed ? 2 : 1,
                    }}
                  >
                    <ListItemIcon sx={{minWidth: collapsed ? 0 : 40, mr: collapsed ? 0 : 2}}>
                      <Icon className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                    </ListItemIcon>
                    {!collapsed && (
                      <ListItemText
                        primary={item.title}
                        sx={{
                          '& .MuiListItemText-primary': {
                            color: isActive ? 'primary.main' : 'text.secondary',
                            fontWeight: isActive ? 600 : 400,
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
