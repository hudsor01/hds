'use client'

import type { FeatureCardProps } from '@/types/feature-card'
import { Tooltip } from '@mui/material'
import { Card } from 'components/ui/cards/card'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

export function FeatureCard({
  title,
  description,
  icon: Icon,
  delay = 0,
  onView
}: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && onView) {
      onView()
    }
  }, [isInView, onView])

  return (
    <Tooltip title={`Learn more about ${title}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        style={{ display: 'block' }}
      >
        <Card className="hover:bg-accent group relative overflow-hidden p-6 transition-colors">
          <div className="space-y-4">
            <div className="bg-primary/10 group-hover:bg-primary/20 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors">
              <Icon
                className="text-primary h-6 w-6 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <div className="via-primary/20 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
        </Card>
      </motion.div>
    </Tooltip>
  )
}
