'use client'

import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function Section({ className, children, ...props }: HTMLMotionProps<'section'>) {
  return (
    <motion.section className={cn('py-16 sm:py-20 md:py-24', className)} {...props}>
      {children}
    </motion.section>
  )
}

export function PageHeader({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto max-w-2xl text-center', className)}>{children}</div>
}

export function PageTitle({ children, className }: ContainerProps) {
  return (
    <h1
      className={cn('text-text-primary text-4xl font-bold tracking-tight sm:text-6xl', className)}
    >
      {children}
    </h1>
  )
}

export function PageDescription({ children, className }: ContainerProps) {
  return <p className={cn('text-text-secondary mt-6 text-lg leading-8', className)}>{children}</p>
}
