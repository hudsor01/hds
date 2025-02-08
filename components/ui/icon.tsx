'use client';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MailIcon from '@mui/icons-material/Mail';

// Add other MUI icons as needed in the mapping below

const iconMapping = {
  'chevron-down': KeyboardArrowDownIcon,
  Heart: FavoriteIcon,
  Mail: MailIcon,
  GitHub: GitHubIcon,
  AlertCircle: ErrorOutlineIcon,
  Check: CheckCircleIcon,
  // Map additional lucide icon names to their @mui/icons-material equivalents here
};

export interface IconProps {
  name: keyof typeof iconMapping;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Component = iconMapping[name];
  if (!Component) {
    console.warn(`Icon "${name}" not found.`);
    return null;
  }
  return <Component className={className} />;
}
