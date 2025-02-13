'use client'

import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export function TypographyH1({ children, className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)}
      {...props}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 className={cn('scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h3>
  )
}

export function TypographyH4({ children, className, ...props }: TypographyProps) {
  return (
    <h4 className={cn('scroll-m-20 text-xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h4>
  )
}

export function TypographyP({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('leading-7 not-first:mt-6', className)} {...props}>
      {children}
    </p>
  )
}

export function TypographyBlockquote({ children, className, ...props }: TypographyProps) {
  return (
    <blockquote
      className={cn('text-muted-foreground mt-6 border-l-2 border-blue-500 pl-6 italic', className)}
      {...props}
    >
      {children}
    </blockquote>
  )
}

export function TypographyLead({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-muted-foreground text-xl', className)} {...props}>
      {children}
    </p>
  )
}

export function TypographyLarge({ children, className, ...props }: TypographyProps) {
  return (
    <div className={cn('text-lg font-semibold', className)} {...props}>
      {children}
    </div>
  )
}

export function TypographySmall({ children, className, ...props }: TypographyProps) {
  return (
    <small className={cn('text-sm leading-none font-medium', className)} {...props}>
      {children}
    </small>
  )
}

export function TypographyMuted({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn('text-muted-foreground text-sm', className)} {...props}>
      {children}
    </p>
  )
}

export function TypographyInlineCode({ children, className, ...props }: TypographyProps) {
  return (
    <code
      className={cn(
        'bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
}

export function TypographyList({ children, className, ...props }: TypographyProps) {
  return (
    <ul className={cn('my-6 ml-6 list-disc [&>li]:mt-2', className)} {...props}>
      {children}
    </ul>
  )
}
