import { cn } from '@/lib/utils';

type StatusType =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'active'
  | 'inactive'
  | 'emergency'
  | 'high'
  | 'medium'
  | 'low';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
  emergency: 'bg-red-100 text-red-800 border-red-200',
  high: 'bg-orange-100 text-orange-800 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-blue-100 text-blue-800 border-blue-200',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const formattedStatus = status.replace('_', ' ').toLowerCase();

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status as StatusType],
        className,
      )}
    >
      {formattedStatus}
    </span>
  );
}
