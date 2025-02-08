import { Icon } from 'react-feather';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: Icon;
  delay?: number;
  onView?: () => void;
}
