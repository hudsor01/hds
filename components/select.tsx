'use client'

import { cn } from '@/lib/utils'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import CheckIcon from '@mui/icons-material/Check'
import { CircularProgress, FormControl, type SelectProps as MuiSelectProps, MenuItem, Select as MuiSelect } from '@mui/material'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

// Define select variants
const selectVariants = cva(
  [
    'relative w-full rounded-md border border-input bg-background text-sm',
    'ring-offset-background placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-input',
        error: 'border-destructive focus:ring-destructive',
      },
      size: {
        default: 'h-10',
        sm: 'h-9 text-xs',
        lg: 'h-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// Define base option type
export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  description?: string
  icon?: React.ReactNode
  [key: string]: unknown
}

// Define select props
export interface SelectProps
  extends Omit<MuiSelectProps, 'variant' | 'error' | 'size'>,
    VariantProps<typeof selectVariants> {
  error?: boolean | string
  options?: SelectOption[]
  placeholder?: string
  helperText?: string
  isLoading?: boolean
  isSearchable?: boolean
  isClearable?: boolean
  containerClassName?: string
  onOptionCreate?: (inputValue: string) => void
  customOptionRenderer?: (option: SelectOption) => React.ReactNode
}

// Define select component
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      error,
      options = [],
      placeholder,
      helperText,
      isLoading,
      isSearchable,
      isClearable,
      containerClassName,
      value,
      onChange,
      onOptionCreate,
      customOptionRenderer,
      id,
      disabled,
      required,
      multiple,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const selectId = id || React.useId()
    const helperId = `${selectId}-helper-text`
    const errorId = `${selectId}-error-text`

    // State for open/close
    const [isOpen, setIsOpen] = React.useState(false)

    // Handle error states
    const hasError = !!error
    const errorMessage = typeof error === 'string' ? error : undefined
    const variantToUse = hasError ? 'error' : variant

    // Handle clear action
    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation()
      onChange?.({ target: { value: multiple ? [] : '' } } as any)
    }

    return (
      <div className={cn('relative w-full', containerClassName)}>
        <FormControl fullWidth error={hasError}>
          <MuiSelect
            ref={ref}
            id={selectId}
            className={cn(selectVariants({ variant: variantToUse, size }), className)}
            value={value}
            onChange={onChange}
            disabled={disabled || isLoading}
            required={required}
            multiple={multiple}
            displayEmpty
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            aria-describedby={cn(
              helperText ? helperId : undefined,
              errorMessage ? errorId : undefined,
              ariaDescribedby
            )}
            IconComponent={(props) => (
              <div className="absolute right-3 flex items-center">
                {isLoading ? (
                  <CircularProgress size={16} />
                ) : isOpen ? (
                  <ExpandLess className="h-5 w-5" />
                ) : (
                  <ExpandMore className="h-5 w-5" />
                )}
              </div>
            )}
            {...props}
          >
            {placeholder && (
              <MenuItem
                value=""
                disabled
                className="text-muted-foreground"
              >
                {placeholder}
              </MenuItem>
            )}
            
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                selected={multiple ? value?.includes(option.value) : value === option.value}
              >
                {customOptionRenderer ? (
                  customOptionRenderer(option)
                ) : (
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <div>
                      <div>{option.label}</div>
                      {option.description && (
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </SelectItem>
            ))}
          </MuiSelect>

          {/* Helper text */}
          {helperText && !errorMessage && (
            <p id={helperId} className="mt-1.5 text-sm text-muted-foreground">
              {helperText}
            </p>
          )}

          {/* Error message */}
          {errorMessage && (
            <p id={errorId} className="mt-1.5 text-sm text-destructive">
              {errorMessage}
            </p>
          )}
        </FormControl>
      </div>
    )
  }
)

Select.displayName = 'Select'

// Define select item props
export interface SelectItemProps
  extends React.ComponentProps<typeof MenuItem> {
  selected?: boolean
}

// Define select item component
export const SelectItem = React.forwardRef<HTMLLIElement, SelectItemProps>(
  ({ className, children, selected, ...props }, ref) => (
    <MenuItem
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selected && <CheckIcon className="h-4 w-4" />}
      </span>
      {children}
    </MenuItem>
  )
)

SelectItem.displayName = 'SelectItem'

// Export types
export type SelectVariant = NonNullable<VariantProps<typeof selectVariants>['variant']>
export type SelectSize = NonNullable<VariantProps<typeof selectVariants>['size']>
