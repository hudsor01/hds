// components/sidebar.tsx
'use client';

import ApartmentIcon from '@mui/icons-material/Apartment';
import BuildIcon from '@mui/icons-material/Build';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

// components/sidebar.tsx

// components/sidebar.tsx

const mainNavItems = [
  {
    href: {pathname: '/dashboard'},
    label: 'Dashboard',
    icon: HomeIcon,
  },
  {
    href: {pathname: '/dashboard/properties'},
    label: 'Properties',
    icon: ApartmentIcon,
  },
  {
    href: {pathname: '/dashboard/tenants'},
    label: 'Tenants',
    icon: PeopleIcon,
  },
  {
    href: {pathname: '/dashboard/maintenance'},
    label: 'Maintenance',
    icon: BuildIcon,
  },
  {
    href: {pathname: '/dashboard/analytics'},
    label: 'Analytics',
    icon: SettingsIcon,
  },
];
