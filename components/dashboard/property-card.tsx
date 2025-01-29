'use client';

import { Card } from 'components/ui/card';
import { Home } from 'react-feather';

export interface PropertyCardProps {
  name: string;
  address: string;
  units: string;
  occupancy: string;
  onUpdate: () => void;
  onDelete: () => void;
}

export function PropertyCard({
  name,
  address,
  units,
  occupancy,
}: PropertyCardProps): React.ReactElement {
  return (
    <Card className='flex items-center space-x-4 p-4'>
      <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100'>
        <Home className='h-6 w-6 text-blue-600' />
      </div>
      <div className='flex-1 space-y-1'>
        <h3 className='font-medium'>{name}</h3>
        <p className='text-sm text-muted-foreground'>{address}</p>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='text-right'>
          <p className='text-sm font-medium'>{units}</p>
          <p className='text-xs text-muted-foreground'>Total Units</p>
        </div>
        <div className='text-right'>
          <p className='text-sm font-medium'>{occupancy}</p>
          <p className='text-xs text-muted-foreground'>Occupancy</p>
        </div>
      </div>
    </Card>
  );
}
