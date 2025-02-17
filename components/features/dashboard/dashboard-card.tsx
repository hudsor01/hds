'use client'

import { Card, CardContent, Typography, Box } from '@mui/material'

interface DashboardCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function DashboardCard({ title, value, description, icon }: DashboardCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          {icon && <Box sx={{ color: 'primary.main' }}>{icon}</Box>}
        </Box>
        <Typography variant="h4" component="div" gutterBottom>
          {value}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}
