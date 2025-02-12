import { PROPERTY_STATUS, PROPERTY_TYPES } from '@/types'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import { useSearchParams } from 'next/navigation'

export function PropertyFilters() {
  const searchParams = useSearchParams()

  return (
    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
      <TextField
        placeholder="Search properties..."
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
        defaultValue={searchParams.get('search') || ''}
      />

      <TextField
        select
        size="small"
        label="Status"
        defaultValue={searchParams.get('status') || 'all'}
      >
        <MenuItem value="all">All Status</MenuItem>
        {Object.entries(PROPERTY_STATUS).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        label="Property Type"
        defaultValue={searchParams.get('type') || 'all'}
      >
        <MenuItem value="all">All Types</MenuItem>
        {Object.entries(PROPERTY_TYPES).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
