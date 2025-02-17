'use client'

import DownloadIcon from '@mui/icons-material/Download'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import type { Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import * as React from 'react'

export type ActivityType = 'SIGN_IN' | 'SIGN_OUT' | 'CREATE' | 'UPDATE' | 'DELETE'

export const ACTIVITY_FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'SIGN_IN', label: 'Sign In' },
  { value: 'SIGN_OUT', label: 'Sign Out' },
  { value: 'CREATE', label: 'Create' },
  { value: 'UPDATE', label: 'Update' },
  { value: 'DELETE', label: 'Delete' }
] as const

interface ActivityHeaderProps {
  filter: ActivityType | 'ALL'
  onFilterChangeAction: (value: ActivityType | 'ALL') => void
  searchQuery: string
  onSearchChangeAction: (value: string) => void
  onExportAction: () => void
}
const StyledBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2)
}))

const HeaderBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

const FiltersBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }: { theme: Theme }) => ({
  gap: theme.spacing(1),
  '& .MuiToggleButton-root': {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark
      }
    }
  }
}))

export function ActivityHeader({
  filter,
  onFilterChangeAction,
  searchQuery,
  onSearchChangeAction,
  onExportAction
}: ActivityHeaderProps) {
  const handleFilterChange = (_: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value) {
      onFilterChangeAction(value as ActivityType | 'ALL')
    }
  }

  return (
    <StyledBox>
      <HeaderBox>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
          Recent Activity
        </Typography>

        <Button variant="outlined" size="small" onClick={onExportAction} startIcon={<DownloadIcon />}>
          Export
        </Button>
      </HeaderBox>

      <FiltersBox>
        <TextField
          fullWidth
          placeholder="Search activities..."
          value={searchQuery}
          onChange={e => {
            onSearchChangeAction(e.target.value)
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }
          }}
          sx={{ flex: 1 }}
        />

        <StyledToggleButtonGroup value={filter} exclusive onChange={handleFilterChange} aria-label="activity filter" size="small">
          {ACTIVITY_FILTERS.map(filter => (
            <ToggleButton key={filter.value} value={filter.value} aria-label={filter.label}>
              {filter.label}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </FiltersBox>
    </StyledBox>
  )
}
