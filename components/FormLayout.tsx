'use client'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

interface FormLayoutProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function FormLayout({ title, description, children, actions }: FormLayoutProps) {
  return (
    <Paper>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            {description}
          </Typography>
        )}
        <Divider sx={{ my: 3 }} />
        <Box component="form" noValidate autoComplete="off">
          {children}
        </Box>
        {actions && (
          <>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>{actions}</Box>
          </>
        )}
      </Box>
    </Paper>
  )
}
