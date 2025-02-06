'use client';

import {Popover, PopoverContent, PopoverTrigger} from '../dialogs/popover';
import {Button} from '@/components/ui/buttons/button';
import {cn} from '@/lib/utils';
import {Calendar} from 'components/ui/calendar';
import {format, startOfYear, subDays, subMonths} from 'date-fns';
import {Calendar as CalendarIcon} from 'react-feather';

interface DateRangePickerProps {
  value:
    | {
        from?: Date;
        to?: Date;
      }
    | undefined;
  onChangeAction: (range: {from?: Date; to?: Date} | undefined) => void;
  className?: string;
}

const presets = [
  {
    label: 'Last 7 days',
    getValue: () => ({
      from: subDays(new Date(), 6),
      to: new Date(),
    }),
  },
  {
    label: 'Last 30 days',
    getValue: () => ({
      from: subDays(new Date(), 29),
      to: new Date(),
    }),
  },
  {
    label: 'Last 90 days',
    getValue: () => ({
      from: subDays(new Date(), 89),
      to: new Date(),
    }),
  },
  {
    label: 'Last 12 months',
    getValue: () => ({
      from: subMonths(new Date(), 11),
      to: new Date(),
    }),
  },
  {
    label: 'Year to date',
    getValue: () => ({
      from: startOfYear(new Date()),
      to: new Date(),
    }),
  },
];

export function DateRangePicker({value, onChangeAction, className}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger>
          <Button
            variant='outline'
            className={cn('justify-start text-left font-normal', !value && 'text-muted-foreground')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y')} - {format(value.to, 'LLL dd, y')}
                </>
              ) : (
                format(value.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChangeAction}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
