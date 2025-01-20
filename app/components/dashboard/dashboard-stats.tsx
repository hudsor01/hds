'use client'

import { cn } from '@/app/lib/utils'
import { Card, CardContent, Tooltip as MuiTooltip } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Box, DollarSign, TrendingUp, Users } from 'react-feather'

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

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
}

const iconVariants = {
  initial: { rotate: -10, scale: 0.9 },
  animate: { rotate: 0, scale: 1 },
  hover: { rotate: 10, scale: 1.1 }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const items = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Box,
      percentageChange: stats.percentageChanges.properties,
      description: "Total number of properties in your portfolio",
      color: "blue"
    },
    {
      title: "Active Tenants",
      value: stats.activeTenants,
      icon: Users,
      percentageChange: stats.percentageChanges.tenants,
      description: "Number of current active tenants",
      color: "green"
    },
    {
      title: "Monthly Revenue",
      value: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(stats.monthlyRevenue),
      icon: DollarSign,
      percentageChange: stats.percentageChanges.revenue,
      description: "Total monthly revenue from all properties",
      color: "purple"
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      icon: TrendingUp,
      percentageChange: stats.percentageChanges.occupancy,
      description: "Current occupancy rate across all properties",
      color: "orange"
    }
  ] as const

  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {items.map((item, index) => (
        <MuiTooltip
          key={item.title}
          title={item.description}
          placement="top"
          arrow
        >
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <Card
              className={cn(
                "overflow-hidden",
                hoveredCard === index && "ring-2",
                item.color === "blue" && "ring-blue-400",
                item.color === "green" && "ring-green-400",
                item.color === "purple" && "ring-purple-400",
                item.color === "orange" && "ring-orange-400"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>
                    <p className="text-2xl font-semibold">
                      {item.value}
                    </p>
                  </div>
                  <motion.div
                    variants={iconVariants}
                    className={cn(
                      "p-3 rounded-full",
                      item.color === "blue" && "bg-blue-100 text-blue-600",
                      item.color === "green" && "bg-green-100 text-green-600",
                      item.color === "purple" && "bg-purple-100 text-purple-600",
                      item.color === "orange" && "bg-orange-100 text-orange-600"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </motion.div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <motion.div
                    animate={{
                      color: item.percentageChange >= 0 ? "#16a34a" : "#dc2626"
                    }}
                    className="flex items-center text-sm font-medium"
                  >
                    <TrendingUp
                      className={cn(
                        "h-4 w-4 mr-1",
                        item.percentageChange >= 0
                          ? "text-green-600"
                          : "text-red-600 rotate-180"
                      )}
                    />
                    {Math.abs(item.percentageChange)}%
                  </motion.div>
                  <span className="text-sm text-gray-500">vs last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </MuiTooltip>
      ))}
    </motion.div>
  )
}
