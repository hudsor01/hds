'use client'

import { Icon } from '-react'
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface FeatureCardProps {
  title: string
  description: string
  icon: Icon
  delay?: number
  onView?: () => void
}

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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger >
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
          >
            <Card className="group relative overflow-hidden p-6 transition-colors hover:bg-accent">
              <div className="space-y-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon
                    className="h-6 w-6 text-primary transition-transform group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />
            </Card>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Learn more about {title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
