'use client'

import { Card, Grid, Typography, Box } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { PropertyList } from '@/components/properties/property-list'
import { usePropertyAnimations } from '@/hooks/use-property-animations'
import { chartAnimation, dataUpdateAnimation } from '@/lib/property-animations'
import { useState, useEffect } from 'react'

const MotionCard = motion(Card)

interface PropertyMetrics {
  totalProperties: number
  occupancyRate: number
  monthlyRevenue: number
  maintenanceCount: number
}

interface PropertyDashboardProps {
  properties: Array<any> // Using the Property type from PropertyList
  metrics: PropertyMetrics
  onEditProperty: (id: string) => void
}

export function PropertyDashboard({ properties, metrics, onEditProperty }: PropertyDashboardProps) {
  const { reduceMotion, measureListRender, animatePropertyUpdate } = usePropertyAnimations()

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    measureListRender(() => {
      setIsLoaded(true)
    })
  }, [measureListRender])

  return (
    <Box sx={{ py: 3 }}>
      <AnimatePresence mode="wait">
        {isLoaded && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <motion.div variants={dataUpdateAnimation} initial={reduceMotion ? 'visible' : 'hidden'} animate="visible">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <MotionCard variants={chartAnimation}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Total Properties
                        </Typography>
                        <Typography variant="h4">{metrics.totalProperties}</Typography>
                      </Box>
                    </MotionCard>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MotionCard variants={chartAnimation}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Occupancy Rate
                        </Typography>
                        <Typography variant="h4">{metrics.occupancyRate}%</Typography>
                      </Box>
                    </MotionCard>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MotionCard variants={chartAnimation}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Monthly Revenue
                        </Typography>
                        <Typography variant="h4">${metrics.monthlyRevenue.toLocaleString()}</Typography>
                      </Box>
                    </MotionCard>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <MotionCard variants={chartAnimation}>
                      <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Maintenance Required
                        </Typography>
                        <Typography variant="h4">{metrics.maintenanceCount}</Typography>
                      </Box>
                    </MotionCard>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <PropertyList
                properties={properties}
                onEditProperty={id => {
                  animatePropertyUpdate(() => {
                    onEditProperty(id)
                  })
                }}
              />
            </Grid>
          </Grid>
        )}
      </AnimatePresence>
    </Box>
  )
}
