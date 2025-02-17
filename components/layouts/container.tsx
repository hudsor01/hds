'use client'

import { forwardRef } from 'react'
import type { ContainerProps as MuiContainerProps } from '@mui/material/Container'
import MuiContainer from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export interface ContainerProps extends MuiContainerProps {
  component?: React.ElementType
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, ...props }, ref) => (
    <MuiContainer
      ref={ref}
      maxWidth="lg"
      {...props}
    >
      {children}
    </MuiContainer>
  )
)

Container.displayName = 'Container'

const StyledSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}))

export function Section({ children, ...props }: ContainerProps) {
  return <StyledSection {...props}>{children}</StyledSection>
}

const StyledPageHeader = styled(Box)(({ theme }) => ({
  maxWidth: '42rem', // equivalent to max-w-2xl
  margin: '0 auto',
  textAlign: 'center',
}))

export function PageHeader({ children, ...props }: ContainerProps) {
  return <StyledPageHeader {...props}>{children}</StyledPageHeader>
}

const StyledPageTitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.h2.fontSize,
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: '-0.025em',
  color: theme.palette.text.primary,
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.h1.fontSize,
  },
}))

export function PageTitle({ children, ...props }: ContainerProps) {
  return (
    <StyledPageTitle variant="h1" component="h1" {...props}>
      {children}
    </StyledPageTitle>
  )
}

const StyledPageDescription = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  fontSize: theme.typography.h6.fontSize,
  lineHeight: 1.75,
  color: theme.palette.text.secondary,
}))

export function PageDescription({ children, ...props }: ContainerProps) {
  return (
    <StyledPageDescription variant="body1" {...props}>
      {children}
    </StyledPageDescription>
  )
}
