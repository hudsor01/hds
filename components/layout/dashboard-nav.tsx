import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {BarChart2, Home, Settings, Users} from 'react-feather';

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

export function DashboardNav() {
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
                <ListItemButton selected={isActive}>
                  <ListItemIcon>
                    <Icon className={isActive ? 'text-primary' : 'text-muted-foreground'} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: isActive ? 'primary.main' : 'text.secondary',
                        fontWeight: isActive ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
