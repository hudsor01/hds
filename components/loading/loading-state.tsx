'use client'

import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

interface LoadingScreenProps {
  message?: string
  sx?: SxProps<Theme>
}

export function Loading({ message = 'Loading...', sx }: LoadingScreenProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        bgcolor: theme.palette.background.default,
        zIndex: theme.zIndex.modal + 1,
        ...sx
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: theme.palette.primary.main
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.text.secondary
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}
