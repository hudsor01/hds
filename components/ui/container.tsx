'use client'

import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ContainerProps extends HTMLMotionProps<'div'> {
  as?: 'section' | 'article' | 'main' | 'div'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
  children: React.ReactNode
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
}

export function Container({
  as: Component = 'div',
  size = 'xl',
  centered = true,
  className,
  children,
  ...props
}: ContainerProps) {
  const MotionComponent = motion[Component] as typeof motion.div

  return (
    <MotionComponent
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8',
        containerSizes[size],
        centered && 'text-center',
        className
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export function Section({
  className,
  children,
  ...props
}: HTMLMotionProps<'section'>) {
  return (
    <motion.section
      className={cn('py-16 sm:py-20 md:py-24', className)}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export function PageHeader({
  className,
  children,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      className={cn('mb-12 space-y-4', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function PageTitle({
  className,
  children,
  ...props
}: HTMLMotionProps<'h1'>) {
  return (
    <motion.h1
      className={cn('text-4xl font-bold text-gray-900 sm:text-5xl', className)}
      {...props}
    >
      {children}
    </motion.h1>
  )
}

export function PageDescription({
  className,
  children,
  ...props
}: HTMLMotionProps<'p'>) {
  return (
    <motion.p
      className={cn('text-xl text-gray-600', className)}
      {...props}
    >
      {children}
    </motion.p>
  )
}
