'use client'

import MuiButton from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardHeader from '@mui/material/CardHeader'
import MuiCardActions from '@mui/material/CardActions'
import { cn } from '@/lib/utils'
import type { PricingCardProps } from '@/types/mui'
import { Check } from 'react-feather'

export function PricingCard({
  title,
  description,
  price,
  duration,
  features,
  highlighted = false,
  buttonText,
  onSubscribeAction
}: PricingCardProps) {
  return (
    <MuiCard
      className={cn(
        'relative flex h-full flex-col overflow-hidden transition-all duration-200',
        highlighted
          ? 'border-primary scale-105 shadow-lg hover:shadow-xl'
          : 'hover:border-primary/50 hover:shadow-md'
      )}
    >
      {highlighted && (
        <div className="bg-primary text-primary-foreground absolute top-6 -right-12 rotate-45 px-12 py-1 text-sm font-medium">
          Popular
        </div>
      )}
      <MuiCardHeader className="space-y-2 pt-6 pb-8 text-center">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </MuiCardHeader>
      <MuiCardContent className="flex flex-1 flex-col">
        <div className="mb-8 flex items-baseline justify-center">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-2 text-sm">{duration}</span>
        </div>
        <ul className="mb-8 space-y-3 px-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              <Check className="text-primary h-4 w-4" />
              {feature}
            </li>
          ))}
        </ul>
      </MuiCardContent>
      <MuiCardActions>
        <MuiButton
          onClick={onSubscribeAction}
          className={cn(
            'w-full transition-colors',
            highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
          )}
          variant={highlighted ? 'contained' : 'outlined'}
        >
          {buttonText}
        </MuiButton>
      </MuiCardActions>
    </MuiCard>
  )
}
