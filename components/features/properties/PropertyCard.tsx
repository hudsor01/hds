import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip, Menu, MenuItem, Stack } from '@mui/material'
import {
  MoreVert as MoreVertIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PropertyCardProps {
  id: string
  title: string
  address: string
  imageUrl?: string
  rentAmount: number
  occupancyStatus: 'occupied' | 'vacant' | 'maintenance'
  tenantCount?: number
  onEdit?: () => void
  onDelete?: () => void
}

const statusColors = {
  occupied: 'success',
  vacant: 'error',
  maintenance: 'warning'
} as const

export function PropertyCard({
  id,
  title,
  address,
  imageUrl,
  rentAmount,
  occupancyStatus,
  tenantCount = 0,
  onEdit,
  onDelete
}: PropertyCardProps) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation()
    handleMenuClose()
    onEdit?.()
  }

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation()
    handleMenuClose()
    onDelete?.()
  }

  const handleCardClick = () => {
    router.push(`/properties/${id}`)
  }

  return (
    <Card
      sx={{
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        }
      }}
      onClick={handleCardClick}
    >
      <CardMedia component="img" height="140" image={imageUrl || '/placeholder-property.jpg'} alt={title} />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {title}
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {address}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <MoneyIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  ${rentAmount.toLocaleString()} /month
                </Typography>
              </Box>
              {tenantCount > 0 && (
                <Box display="flex" alignItems="center" gap={1}>
                  <PersonIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {tenantCount} tenant{tenantCount !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
          <Box>
            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box mt={2}>
          <Chip
            label={occupancyStatus.charAt(0).toUpperCase() + occupancyStatus.slice(1)}
            color={statusColors[occupancyStatus]}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  )
}
