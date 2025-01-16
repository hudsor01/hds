'use client'

import { Card } from '@/components/ui/card'
import
  {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, DollarSign, LineChart, TrendingUp, Users2 } from 'lucide-react'
import { useState } from 'react'

interface PercentageChanges {
  properties: number
  tenants: number
  revenue: number
  occupancy: number
}

export interface PropertyStats {
  totalProperties: number
  activeTenants: number
  monthlyRevenue: number
  occupancyRate: number
  percentageChanges: PercentageChanges
}

interface DashboardStatsProps {
  stats: PropertyStats
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const items = [
    {
      name: 'Total Properties',
      value: stats.totalProperties,
      change: stats.percentageChanges.properties,
      icon: Building2,
      formatter: (value: number) => value.toString(),
      detail: 'Total number of properties in your portfolio'
    },
    {
      name: 'Active Tenants',
      value: stats.activeTenants,
      change: stats.percentageChanges.tenants,
      icon: Users2,
      formatter: (value: number) => value.toString(),
      detail: 'Current number of active tenant leases'
    },
    {
      name: 'Monthly Revenue',
      value: stats.monthlyRevenue,
      change: stats.percentageChanges.revenue,
      icon: DollarSign,
      formatter: (value: number) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value),
      detail: 'Total monthly revenue from all properties'
    },
    {
      name: 'Occupancy Rate',
      value: stats.occupancyRate,
      change: stats.percentageChanges.occupancy,
      icon: LineChart,
      formatter: (value: number) => `${value.toFixed(1)}%`,
      detail: 'Current occupancy rate across all properties'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TooltipProvider>
        {items.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Card
                className={cn(
                  'relative overflow-hidden p-6 transition-all duration-200',
                  hoveredCard === item.name ? 'ring-2 ring-primary' : ''
                )}
                onMouseEnter={() => setHoveredCard(item.name)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-semibold">{item.formatter(item.value)}</p>
                      <AnimatePresence>
                        {item.change !== 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={cn(
                              'flex items-center gap-0.5 text-xs',
                              item.change > 0 ? 'text-green-500' : 'text-red-500'
                            )}
                          >
                            <TrendingUp
                              className={cn(
                                'h-3 w-3',
                                item.change < 0 && 'rotate-180 transform'
                              )}
                            />
                            <span>{Math.abs(item.change)}%</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="rounded-full bg-primary/10 p-2">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.detail}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  )
}
