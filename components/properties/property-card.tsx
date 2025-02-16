'use client'

import { Card, CardContent, CardActionArea, Typography, Box, Chip, Stack } from '@mui/material'
import { formatCurrency, formatNumber } from '@/utils/format'
import { type Property, type PropertyStatus } from '@/types/properties'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const statusColors: Record<PropertyStatus, string> = {
  available: 'success.main',
  rented: 'primary.main',
  maintenance: 'warning.main',
  listed: 'info.main',
  inactive: 'text.disabled'
}

const statusLabels: Record<PropertyStatus, string> = {
  available: 'Available',
  rented: 'Rented',
  maintenance: 'Under Maintenance',
  listed: 'Listed',
  inactive: 'Inactive'
}

interface PropertyCardProps {
  property: Property
  showActions?: boolean
  className?: string
  onPropertyClick?: (property: Property) => void
}

export function PropertyCard({
  property,
  showActions = true,
  className,
  onPropertyClick
}: PropertyCardProps): JSX.Element {
  const router = useRouter()

  const handleClick = () => {
    if (onPropertyClick) {
      onPropertyClick(property)
    } else if (showActions) {
      router.push(`/properties/${property.id}`)
    }
  }

  const renderStatus = () => (
    <Chip
      size="small"
      label={statusLabels[property.status]}
      sx={{
        bgcolor: statusColors[property.status],
        color: 'white',
        fontWeight: 500,
        '& .MuiChip-label': {
          px: 2
        }
      }}
    />
  )

  return (
    <Card
      elevation={1}
      className={cn(
        'transition-all duration-200',
        showActions && 'hover:shadow-md hover:-translate-y-0.5',
        className
      )}
    >
      <CardActionArea
        onClick={handleClick}
        component="div"
        className="h-full flex flex-col"
      >
        {property.images?.[0] && (
          <Box className="relative h-48 w-full bg-gray-100">
            <Image
              src={property.images[0]}
              alt={property.address}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
            <Box className="absolute top-3 right-3">
              {renderStatus()}
            </Box>
          </Box>
        )}

        <CardContent className="flex-1 p-6">
          <Typography variant="h6" gutterBottom className="line-clamp-2">
            {property.address}
          </Typography>

          <Stack spacing={3}>
            <Box>
              <Typography color="text.secondary" variant="body2">
                Monthly Rent
              </Typography>
              <Typography variant="h6" color="primary.main" className="font-semibold">
                {formatCurrency(property.monthly_rent)}
              </Typography>
            </Box>

            <Stack direction="row" spacing={4} className="justify-between">
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Bedrooms
                </Typography>
                <Typography>{property.bedrooms}</Typography>
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2">
                  Bathrooms
                </Typography>
                <Typography>{property.bathrooms}</Typography>
              </Box>

              <Box>
                <Typography color="text.secondary" variant="body2">
                  Sq Ft
                </Typography>
                <Typography>{formatNumber(property.square_feet)}</Typography>
              </Box>
            </Stack>

            {property.amenities?.length > 0 && (
              <Box>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Amenities
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {property.amenities.slice(0, 3).map(amenity => (
                    <Chip
                      key={amenity}
                      label={amenity}
                      size="small"
                      className="bg-gray-100"
                    />
                  ))}
                  {property.amenities.length > 3 && (
                    <Chip
                      label={`+${property.amenities.length - 3} more`}
                      size="small"
                      className="bg-gray-100"
                    />
                  )}
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}