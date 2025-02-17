'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function FormWrapper({ children, maxWidth = 'md', className, ...props }: FormWrapperProps) {
  return (
    <div
      className={cn(
        'space-y-6',
        maxWidth === 'sm' && 'max-w-sm',
        maxWidth === 'md' && 'max-w-md',
        maxWidth === 'lg' && 'max-w-lg',
        maxWidth === 'xl' && 'max-w-xl',
        maxWidth === 'full' && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: string
}

export function FormInput({ label, description, error, className, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={props.id || props.name}
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <Input className={className} {...props} />
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  )
}

interface FormLayoutProps {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent) => void
  className?: string
}

export function FormLayout({ children, onSubmit, className }: FormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className={cn('space-y-8', className)}>
      {children}
    </form>
  )
}

// Base form components with animations
const fadeInAnimation = 'animate-in fade-in duration-300'
const slideUpAnimation = 'animate-in slide-in-from-bottom-2 duration-300'

export const AnimatedFormField = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof FormField>>(
  ({ className, ...props }, ref) => (
    <FormField ref={ref} className={cn(fadeInAnimation, slideUpAnimation, className)} {...props} />
  )
)
AnimatedFormField.displayName = 'AnimatedFormField'

export const AnimatedFormItem = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof FormItem>>(
  ({ className, ...props }, ref) => <FormItem ref={ref} className={cn(fadeInAnimation, slideUpAnimation, className)} {...props} />
)
AnimatedFormItem.displayName = 'AnimatedFormItem'

// Form with built-in loading state
interface LoadingFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  isLoading?: boolean
  loadingText?: string
  children: React.ReactNode
}

export function LoadingForm({ isLoading, loadingText = 'Loading...', children, ...props }: LoadingFormProps) {
  return (
    <form {...props} className={cn('space-y-6', props.className)}>
      <div className={cn('space-y-6', isLoading && 'opacity-50')}>{children}</div>
      {isLoading && (
        <div className="bg-background/50 absolute inset-0 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>{loadingText}</span>
          </div>
        </div>
      )}
    </form>
  )
}

// Re-export form primitives
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage }
