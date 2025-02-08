import { routes } from '../../routes';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

export const ROLE = {
  ADMIN: 'ADMIN',
  TENANT: 'TENANT',
  PROPERTY_MANAGER: 'PROPERTY_MANAGER',
  PROPERTY_OWNER: 'PROPERTY_OWNER',
  VENDOR: 'VENDOR',
} as const;

export type Role = (typeof ROLE)[keyof typeof ROLE];

export const ACTIVITY_TYPES = {
  MAINTENANCE: 'MAINTENANCE',
  PAYMENT: 'PAYMENT',
  LEASE: 'LEASE',
} as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[keyof typeof ACTIVITY_TYPES];

export const ACTIVITY_STATUS = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
} as const;

export type ActivityStatus =
  (typeof ACTIVITY_STATUS)[keyof typeof ACTIVITY_STATUS];

export const PRIORITY_LEVELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
} as const;

export type PriorityLevel =
  (typeof PRIORITY_LEVELS)[keyof typeof PRIORITY_LEVELS];

export const navItems = [
  { name: 'Dashboard', href: routes.dashboard, icon: HomeIcon },
  { name: 'Properties', href: routes.properties.index, icon: ApartmentIcon },
  { name: 'Tenants', href: routes.tenants.index, icon: PeopleIcon },
  { name: 'Leases', href: routes.leases.index, icon: DescriptionIcon },
  { name: 'Finances', href: routes.finances.index, icon: AttachMoneyIcon },
  { name: 'Maintenance', href: routes.maintenance.index, icon: BuildIcon },
  { name: 'Settings', href: routes.settings, icon: SettingsIcon },
];

export const ACTIVITY_FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'PAYMENT', label: 'Payments' },
  { value: 'LEASE', label: 'Leases' },
] as const;

export const PRIORITY_LABELS = {
  low: 'Low Priority',
  medium: 'Medium Priority',
  high: 'High Priority',
  critical: 'Critical Priority',
} as const;

export const STATUS_LABELS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
} as const;

export const PROPERTY_STATUS = {
  active: 'Active',
  inactive: 'Inactive',
  maintenance: 'Under Maintenance',
} as const;

export const PROPERTY_TYPES = {
  apartment: 'Apartment',
  house: 'House',
  condo: 'Condominium',
  commercial: 'Commercial',
} as const;

export const LEASE_STATUS = {
  active: 'Active',
  pending: 'Pending',
  expired: 'Expired',
  terminated: 'Terminated',
} as const;

export const LEASE_TYPES = {
  residential: 'Residential',
  commercial: 'Commercial',
  shortTerm: 'Short Term',
} as const;

export const MOCK_ANALYTICS_DATA = {
  financialPerformance: {
    monthlyTrend: [
      { month: 'Jan', revenue: 48900, expenses: 33200 },
      { month: 'Feb', revenue: 52300, expenses: 35100 },
      { month: 'Mar', revenue: 49800, expenses: 34500 },
      { month: 'Apr', revenue: 51200, expenses: 33800 },
      { month: 'May', revenue: 53400, expenses: 34900 },
      { month: 'Jun', revenue: 54800, expenses: 35600 },
    ],
  },
  tenantActivity: {
    newLeases: 15,
    renewals: 12,
    moveOuts: 8,
  },
  propertyOccupancy: {
    'Town Apartments': 92,
    'Sunset Heights': 88,
    'Ocean View Complex': 95,
    'Mountain Lodge': 90,
  },
  revenueDistribution: {
    'Rental Income': 75,
    'Parking Fees': 10,
    Amenities: 8,
    Other: 7,
  },
  tenantInsights: {
    satisfaction: {
      current: 4.2,
      trend: [4.0, 4.1, 4.2, 4.2, 4.3, 4.2],
    },
    maintenance: {
      avgResolutionTime: {
        open: 2.5,
        inProgress: 1.8,
        completed: 1.2,
      },
      requests: {
        open: 12,
        inProgress: 8,
        completed: 45,
      },
    },
    retention: {
      '2023': 85,
      '2024': 88,
    },
  },
};
