import { type PropertyListProps } from '@/types'
import { useIntl } from 'react-intl'
import { PropertyCard } from './property-card'
import Grid from '@mui/material/Grid'

export default function PropertyList({
  properties,
  onEdit,
  onViewDetails,
  onManageTenants
}: PropertyListProps) {
  const intl = useIntl()

  if (!properties.length) {
    return (
      <div className="py-8 text-center">
        <p>{intl.formatMessage({ id: 'property.noProperties' })}</p>
      </div>
    )
  }

  return (
    <Grid container spacing={3}>
      {properties.map(property => (
        <Grid item xs={12} sm={6} md={4} key={property.id}>
          <PropertyCard
            property={property}
            onEdit={onEdit}
            onViewDetails={onViewDetails}
            onManageTenants={onManageTenants}
          />
        </Grid>
      ))}
    </Grid>
  )
}
