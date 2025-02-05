'use client';

import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const features: Feature[] = [
  {
    title: 'Property Management',
    description: 'Efficiently manage your properties with our comprehensive dashboard.',
    icon: HomeIcon,
  },
  {
    title: 'Tenant Portal',
    description: 'Give tenants access to a dedicated portal for payments and maintenance requests.',
    icon: PeopleIcon,
  },
  {
    title: 'Financial Tracking',
    description: 'Track rent payments, expenses, and generate financial reports.',
    icon: BarChartIcon,
  },
  {
    title: 'Maintenance Management',
    description: 'Handle maintenance requests and track repairs efficiently.',
    icon: SettingsIcon,
  },
  {
    title: 'Document Management',
    description: 'Store and manage all property-related documents securely.',
    icon: InsertDriveFileIcon,
  },
  {
    title: 'Payment Processing',
    description: 'Process rent payments and security deposits electronically.',
    icon: CreditCardIcon,
  },
  {
    title: 'Scheduling',
    description: 'Schedule viewings, maintenance, and other property-related events.',
    icon: CalendarTodayIcon,
  },
  {
    title: 'Communication Hub',
    description: 'Streamline communication between property managers, owners, and tenants.',
    icon: ChatBubbleOutlineIcon,
  },
];
