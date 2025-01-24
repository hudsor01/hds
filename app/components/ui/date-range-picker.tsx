'use client'

import { CalendarIcon, Check } from "-react"
import { cn } from "@/auth/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { format, startOfYear, subDays, subMonths } from "date-fns"
import * as React from "react"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
  value: DateRange
  onChangeAction: (range: DateRange) => void
  className?: string
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
]

export function DateRangePicker({
  value,
  onChangeAction,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger >
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y")} -{" "}
                  {format(value.to, "LLL dd, y")}
                </>
              ) : (
                format(value.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            <Command className="w-[200px] border-r">
              <CommandGroup heading="Quick ranges">
                {presets.map((preset) => (
                  <CommandItem
                    key={preset.label}
                    onSelect={() => {
                      onChangeAction(preset.getValue())
                      setIsOpen(false)
                    }}
                  >
                    <span className="mr-2">{preset.label}</span>
                    {value?.from &&
                      value?.to &&
                      preset.getValue().from.getTime() === value.from.getTime() &&
                      preset.getValue().to.getTime() === value.to.getTime() && (
                        <Check className="h-4 w-4" />
                      )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
            <Separator orientation="vertical" />
            <div className="p-2">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={(range: DateRange | undefined) => onChangeAction(range ?? value)}
                numberOfMonths={2}
                required={false}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
