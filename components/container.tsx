'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { JSX } from 'react'
import MuiContainer from '@mui/material/Container'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps): JSX.Element {
  return (
    <MuiContainer className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </MuiContainer>
  )
}

export function Section({ children, className }: ContainerProps): JSX.Element {
  return <section className={cn('py-12 md:py-16 lg:py-20', className)}>{children}</section>
}
export function PageHeader({ children, className }: ContainerProps): JSX.Element {
  return <div className={cn('mx-auto max-w-2xl text-center', className)}>{children}</div>
}

export function PageTitle({ children, className }: ContainerProps): JSX.Element {
  return (
    <h1
      className={cn('text-text-primary text-4xl font-bold tracking-tight sm:text-6xl', className)}
    >
      {children}
    </h1>
  )
}

export function PageDescription({ children, className }: ContainerProps): JSX.Element {
  return <p className={cn('text-text-secondary mt-6 text-lg leading-8', className)}>{children}</p>
}
