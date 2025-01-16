import * as FeatherIcons from 'react-feather';
import { IconProps as FeatherIconProps } from 'react-feather';

export interface IconProps extends Omit<FeatherIconProps, 'ref'> {
  name: keyof typeof FeatherIcons;
  className?: string;
}

export function Icon({ name, className = '', size = 24, ...props }: IconProps) {
  const FeatherIcon = FeatherIcons[name];

  return (
    <FeatherIcon
      size={size}
      className={`inline-block align-middle ${className}`}
      aria-hidden="true"
      {...props}
    />
  );
}
