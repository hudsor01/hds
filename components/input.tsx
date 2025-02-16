'use client'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import * as React from 'react'
import { IconType } from 'react-icons'

// Define input variants
const inputVariants = cva(
  [
    'flex w-full rounded-md border border-input bg-background px-3 py-2',
    'text-sm ring-offset-background',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-colors duration-200'
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'border-input',
        ghost: 'border-none shadow-none',
        error: 'border-destructive focus-visible:ring-destructive'
      },
      size: {
        default: 'h-10',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

// Define wrapper variants for the input container
const inputWrapperVariants = cva('relative flex w-full', {
  variants: {
    hasLeftIcon: {
      true: '[&>input]:pl-10',
      false: ''
    },
    hasRightIcon: {
      true: '[&>input]:pr-10',
      false: ''
    }
  },
  defaultVariants: {
    hasLeftIcon: false,
    hasRightIcon: false
  }
})

// Define base input props
export interface InputBaseProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  error?: boolean | string
  leftIcon?: IconType | React.ReactNode
  rightIcon?: IconType | React.ReactNode
  isLoading?: boolean
  helperText?: string
  containerClassName?: string
}

// Define different types of inputs
type TextInputProps = InputBaseProps & {
  type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number'
}

type FileInputProps = InputBaseProps & {
  type: 'file'
  accept?: string
  multiple?: boolean
}

type DateInputProps = InputBaseProps & {
  type: 'date' | 'datetime-local' | 'month' | 'time' | 'week'
  min?: string
  max?: string
}

// Union type for all input props
export type InputProps = TextInputProps | FileInputProps | DateInputProps

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      variant,
      size,
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      isLoading,
      helperText,
      containerClassName,
      disabled,
      required,
      id,
      'aria-describedby': ariaDescribedby,
      ...props
    },
    ref
  ) => {
    // Generate unique IDs for accessibility
    const generatedId = React.useId()
    const inputId = id || generatedId
    const helperId = `${inputId}-helper-text`
    const errorId = `${inputId}-error-text`

    // Determine if we're showing an error state
    const hasError = !!error
    const errorMessage = typeof error === 'string' ? error : undefined
    const variantToUse = hasError ? 'error' : variant

    // Handle icon rendering
    const renderIcon = (Icon: typeof LeftIcon | typeof RightIcon, position: 'left' | 'right') => {
      if (!Icon) return null

      const wrapperClassName = cn(
        'absolute inset-y-0 flex items-center',
        position === 'left' ? 'left-3' : 'right-3'
      )

      // If it's already a React element
      if (React.isValidElement(Icon)) {
        return (
          <span className={wrapperClassName}>
            {React.cloneElement(Icon as React.ReactElement, {
              className: cn(
                'h-4 w-4',
                (Icon as React.ReactElement<any>).props.className || ''
              ),
              'aria-hidden': 'true'
            })}
          </span>
        )
      }

      // If it's an icon component
      if (typeof Icon === 'function') {
        const IconComponent = Icon as IconType
        return (
          <span className={wrapperClassName}>
            <IconComponent className="h-4 w-4" aria-hidden="true" />
          </span>
        )
      }

      return null
    }

    // Handle loading state
    const showRightIcon = isLoading ? (
      <span className="absolute inset-y-0 right-3 flex items-center">
        <AutorenewIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
      </span>
    ) : (
      renderIcon(RightIcon, 'right')
    )

    return (
      <div className={cn('relative w-full', containerClassName)}>
        <div
          className={inputWrapperVariants({
            hasLeftIcon: !!LeftIcon,
            hasRightIcon: !!(RightIcon || isLoading)
          })}
        >
          {renderIcon(LeftIcon, 'left')}
          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            required={required}
            aria-invalid={hasError}
            aria-describedby={cn(
              helperText ? helperId : undefined,
              errorMessage ? errorId : undefined,
              ariaDescribedby
            )}
            className={cn(inputVariants({ variant: variantToUse, size }), className)}
            {...props}
          />
          {showRightIcon}
        </div>

        {/* Helper text */}
        {helperText && !errorMessage && (
          <p id={helperId} className="text-muted-foreground mt-1.5 text-sm">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {errorMessage && (
          <p id={errorId} className="text-destructive mt-1.5 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// Export variants and types
export type InputVariant = NonNullable<VariantProps<typeof inputVariants>['variant']>
export type InputSize = NonNullable<VariantProps<typeof inputVariants>['size']>
export { inputVariants }
