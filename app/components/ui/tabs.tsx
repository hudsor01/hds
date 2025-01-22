'use client'

import { Box, Tab as MuiTab, Tabs as MuiTabs } from '@mui/material'
import { styled } from '@mui/material/styles'
import * as React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  )
}

const StyledTabs = styled(MuiTabs)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.primary.main,
  },
}))

const StyledTab = styled(MuiTab)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  padding: '12px 16px',
  marginRight: theme.spacing(4),
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.fontWeightRegular,
  '&:hover': {
    color: theme.palette.text.primary,
    opacity: 1,
  },
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
}))

interface TabsProps {
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  items: { label: string; content: React.ReactNode }[]
}

export function Tabs({ value, onChange, items }: TabsProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs
          value={value}
          onChange={onChange}
          aria-label="tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          {items.map((item, index) => (
            <StyledTab
              key={index}
              label={item.label}
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
            />
          ))}
        </StyledTabs>
      </Box>
      {items.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  )
}
