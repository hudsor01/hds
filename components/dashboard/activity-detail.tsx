'use client';

import { PRIORITY_LABELS, STATUS_LABELS } from '@/auth/lib/constants';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from 'components/ui/sheet';
import { format } from 'date-fns';
import type { RecentActivity } from 'types/dashboard';

interface ActivityDetailProps {
  activity: RecentActivity;
  onCloseAction: () => void;
  open: boolean;
}

export function ActivityDetail({ activity, onCloseAction, open }: ActivityDetailProps) {
  const renderActivitySpecificDetails = () => {
    switch (activity.type) {
      case 'MAINTENANCE':
        return (
          activity.priority && (
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Priority</h3>
              <p className='mt-1 text-sm'>
                {PRIORITY_LABELS[activity.priority.toLowerCase() as keyof typeof PRIORITY_LABELS] ||
                  activity.priority}
              </p>
            </div>
          )
        );
      case 'PAYMENT':
        return (
          activity.amount && (
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>Amount</h3>
              <p className='mt-1 text-sm'>${activity.amount.toFixed(2)}</p>
            </div>
          )
        );
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onCloseAction}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Activity Details</SheetTitle>
        </SheetHeader>

        <div className='mt-6 space-y-6'>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>Description</h3>
            <p className='mt-1 text-sm'>{activity.description}</p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>Date & Time</h3>
            <p className='mt-1 text-sm'>{format(new Date(activity.timestamp), 'PPpp')}</p>
          </div>

          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>Status</h3>
            <p className='mt-1 text-sm'>
              {STATUS_LABELS[activity.status as keyof typeof STATUS_LABELS] || activity.status}
            </p>
          </div>

          {renderActivitySpecificDetails()}
        </div>
      </SheetContent>
    </Sheet>
  );
}
