'use client';

import {Card} from 'components/ui/cards/card';
import type {Icon} from 'react-feather';

export interface StatsCardProps {
  icon: Icon;
  label: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({icon: Icon, label, value, trend}: StatsCardProps): React.ReactElement {
  return (
    <Card className='flex items-center space-x-4 p-4'>
      <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10'>
        <Icon className='h-6 w-6 text-primary' />
      </div>
      <div className='flex-1 space-y-1'>
        <p className='text-sm text-muted-foreground'>{label}</p>
        <div className='flex items-baseline space-x-2'>
          <h3 className='text-2xl font-semibold'>{value}</h3>
          {trend && (
            <span className={`text-sm ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.value}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
