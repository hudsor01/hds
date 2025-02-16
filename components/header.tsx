'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeaderBackgroundProps {
  pattern?: boolean
  gradient?: boolean
  children?: React.ReactNode
  className?: string
}

export function HeaderBackground({
  pattern = true,
  gradient = true,
  children,
  className
}: HeaderBackgroundProps) {
  return (
    <div
      className={cn(
        'relative min-h-[50vh]',
        gradient && 'bg-gradient-to-br from-[var(--primary-color-light)] via-white to-white',
        className
      )}
    >
      {pattern && <div className="bg-grid-pattern absolute inset-0 opacity-10" />}
      {children}
    </div>
  )
}

interface FeaturedSectionProps {
  className?: string
  children: React.ReactNode
  delay?: number
}

export function FeaturedSection({ className, children, delay = 0 }: FeaturedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className={cn('py-24', className)}
    >
      {children}
    </motion.div>
  )
}

interface GradientTextProps {
  children: React.ReactNode
  className?: string
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span
      className={cn(
        'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  )
}

interface HighlightedTextProps {
  children: React.ReactNode
  className?: string
}

export function HighlightedText({ children, className }: HighlightedTextProps) {
  return (
    <span className={cn('relative inline-block', className)}>
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 -z-10 h-3 w-full bg-[var(--primary-color-light)] opacity-30" />
    </span>
  )
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = ''
}: {
  value: number
  prefix?: string
  suffix?: string
}) {
  return (
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {prefix}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {value}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

export function AnimatedDivider({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent',
        className
      )}
    />
  )
}
