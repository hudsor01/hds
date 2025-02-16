'use client'

import * as React from 'react'
import { DayPicker as MuiDayPicker } from 'react-day-picker'
import MuiButton from '@mui/material/Button'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof MuiDayPicker>

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <MuiDayPicker
      showOutsideDays={showOutsideDays}
      className={className}
      classNames={{
        ...classNames,
        button: cn(MuiButton, { variant: 'outlined' })
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'
