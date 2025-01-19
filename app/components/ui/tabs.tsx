"use client"

import { cn } from '@/lib/utils'
import type { TabProps as MuiTabProps, TabsProps as MuiTabsProps } from '@mui/material'
import {
    Tab as MuiTab,
    Tabs as MuiTabs,
    styled,
} from '@mui/material'
import * as React from 'react'

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  minHeight: 36,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[100],
  '& .MuiTabs-indicator': {
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    zIndex: 0,
  },
}))

const StyledTab = styled(MuiTab)(({ theme }) => ({
  minHeight: 36,
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14),
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.text.primary,
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.selected,
  },
  zIndex: 1,
}))

export interface TabsProps extends Omit<MuiTabsProps, 'orientation'> {
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, onChange, defaultValue, onValueChange, children, ...props }, ref) => {
    const handleChange = React.useCallback(
      (event: React.SyntheticEvent, newValue: string) => {
        onChange?.(event, newValue)
        onValueChange?.(newValue)
      },
      [onChange, onValueChange]
    )

    return (
      <StyledTabs
        ref={ref}
        value={value ?? defaultValue}
        onChange={handleChange}
        className={cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', className)}
        {...props}
      >
        {children}
      </StyledTabs>
    )
  }
)
Tabs.displayName = 'Tabs'

export interface TabProps extends Omit<MuiTabProps, 'value'> {
  value: string
}

export const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ className, ...props }, ref) => (
    <StyledTab
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
)
Tab.displayName = 'Tab'

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  tabValue: string
}

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ className, value, tabValue, children, ...props }, ref) => {
    if (value !== tabValue) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabPanel.displayName = 'TabPanel'
