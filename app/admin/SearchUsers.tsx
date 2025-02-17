'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Paper, InputBase, IconButton, Box, FormControl } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'

export function SearchUsers() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())

    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Paper
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search users by email..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
            }}
            inputProps={{ 'aria-label': 'search users' }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </FormControl>
    </Box>
  )
}
