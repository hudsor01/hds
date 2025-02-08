import { Card, CardContent, CardProps, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';

// Property Card
interface PropertyCardProps extends CardProps {
  title: string;
  address: string;
  status: 'vacant' | 'occupied' | 'maintenance';
  rentAmount: number;
  onView?: () => void;
  onEdit?: () => void;
}

export function PropertyCard({
  title,
  address,
  status,
  rentAmount,
  onView,
  onEdit,
  ...props
}: PropertyCardProps) {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="text.secondary">{address}</Typography>
        <Typography>Status: {status}</Typography>
        <Typography>Rent: ${rentAmount}</Typography>
      </CardContent>
    </Card>
  );
}

// Feature Grid
interface FeatureProps {
  title: string;
  description: string;
  icon: ReactNode;
}

interface FeatureGridProps {
  features: FeatureProps[];
}

export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <Grid container spacing={4}>
      {features.map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              {feature.icon}
              <Typography variant="h6">{feature.title}</Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

// Pricing Tier
interface PricingTierProps extends CardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
  onSubscribe?: () => void;
}

export function PricingTier({
  title,
  price,
  description,
  features,
  recommended,
  onSubscribe,
  ...props
}: PricingTierProps) {
  return (
    <Card
      {...props}
      sx={{
        borderColor: recommended ? 'primary.main' : undefined,
        borderWidth: recommended ? 2 : 1,
        ...props.sx,
      }}
    >
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">${price}/mo</Typography>
        <Typography color="text.secondary">{description}</Typography>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
