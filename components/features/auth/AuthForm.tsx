'use client'

import React from 'react'
import { Box, Paper, Typography, Container } from '@mui/material'
import type { AuthFormProps } from '@/types/auth'

export function AuthForm({ children, title }: AuthFormProps) {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Typography component="h1" variant="h5" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {children}
        </Paper>
      </Box>
    </Container>
  )
}