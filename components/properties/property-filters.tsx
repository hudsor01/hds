// components/properties/property-filters.tsx
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {useSearchParams} from 'next/navigation';

export function PropertyFilters() {
  const searchParams = useSearchParams();

  return (
    <Box sx={{display: 'flex', gap: 2, my: 2}}>
      <TextField
        placeholder='Search properties...'
        size='small'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        defaultValue={searchParams.get('search') || ''}
      />

      <TextField
        select
        size='small'
        label='Status'
        defaultValue={searchParams.get('status') || 'all'}
      >
        <MenuItem value='all'>All Status</MenuItem>
        <MenuItem value='occupied'>Occupied</MenuItem>
        <MenuItem value='vacant'>Vacant</MenuItem>
        <MenuItem value='maintenance'>Maintenance</MenuItem>
      </TextField>

      <TextField
        select
        size='small'
        label='Property Type'
        defaultValue={searchParams.get('type') || 'all'}
      >
        <MenuItem value='all'>All Types</MenuItem>
        <MenuItem value='house'>House</MenuItem>
        <MenuItem value='apartment'>Apartment</MenuItem>
        <MenuItem value='condo'>Condo</MenuItem>
      </TextField>
    </Box>
  );
}
