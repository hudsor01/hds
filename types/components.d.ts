import type { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react'

export type ComponentProps<T extends ElementType> = PropsWithChildren<{
  as?: T
  className?: string
}> &
  Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

// Common Props
export interface BaseProps {
  className?: string
  children?: React.ReactNode
}

// Form Props
export interface FormControlProps extends BaseProps {
  error?: string
  required?: boolean
  disabled?: boolean
}

// Input Props
export interface InputProps extends FormControlProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  placeholder?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// Button Props
export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

// Layout Props
export interface LayoutProps extends BaseProps {
  padding?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

// Animation Props
export interface AnimationProps {
  initial?: Record<string, any>
  animate?: Record<string, any>
  exit?: Record<string, any>
  transition?: Record<string, any>
}

// Toast Props
export interface ToastProps {
  id: string | number
  title?: string
  description?: string
  action?: React.ReactNode
  type?: 'default' | 'success' | 'error' | 'warning'
  duration?: number
  onClose?: () => void
}
