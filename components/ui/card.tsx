'use client'

import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'interactive' | 'highlight'
  children: React.ReactNode
}

export function Card({ variant = 'default', children, className, ...props }: CardProps) {
  const baseStyles = 'surface overflow-hidden'
  const variants = {
    default: '',
    interactive: 'transition-shadow hover:shadow-md',
    highlight: 'border-2 border-[var(--primary-color)]'
  }

  return (
    <motion.div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </motion.div>
  )
}

interface CardHeaderProps {
  className?: string
  children: React.ReactNode
}

export function CardHeader({ className, children }: CardHeaderProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

interface CardContentProps {
  className?: string
  children: React.ReactNode
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>
}

interface CardFooterProps {
  className?: string
  children: React.ReactNode
}

export function CardFooter({ className, children }: CardFooterProps) {
  return <div className={cn('border-t border-gray-200 px-6 py-4', className)}>{children}</div>
}
