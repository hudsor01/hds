'use client'

import { Button } from '@/components/ui/buttons/button'
import { cn } from '@/lib/utils'
import type { PricingCardProps } from '@/types/mui'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from 'components/ui/cards/card'
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
    <Card
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
      <CardHeader className="space-y-2 pt-6 pb-8 text-center">
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
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
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSubscribeAction}
          className={cn(
            'w-full transition-colors',
            highlighted ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
          )}
          variant={highlighted ? 'default' : 'outline'}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
