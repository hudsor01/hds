'use client'

import { type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { Typography } from '@mui/material'
import Grid2 from '@mui/material/Grid2'

import { PublicLayout } from '@/components/layout/public-layout'
import { PageTransition } from '@/components/layout/page-transition'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { HeroSection } from '@/components/sections/hero-section'

const MotionCard = motion(Card)

interface Feature {
  title: string
  description: string
}

const features: Feature[] = [
  {
    title: 'Smart Management',
    description: 'Streamline your property operations with AI-powered insights'
  },
  {
    title: 'Real-time Analytics',
    description: 'Make data-driven decisions with comprehensive reporting'
  },
  {
    title: 'Automated Workflows',
    description: 'Automate routine tasks and focus on what matters'
  }
]

export default function HomePage(): ReactElement {
  return (
    <PublicLayout>
      <PageTransition>
        <HeroSection />
        <section className="bg-background-ui relative py-12">
          <Container>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-text-primary mb-12 text-3xl font-bold"
            >
              Coming Soon
            </motion.h2>
            <Grid2 container spacing={4}>
              {features.map((feature, index) => (
                <Grid2 key={feature.title} size={{ xs: 12, sm: 6, md: 4 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <MotionCard
                      variant="outline"
                      className="p-6 transition-shadow duration-300 hover:shadow-lg"
                    >
                      <Typography
                        variant="h5"
                        component="h3"
                        className="mb-4 text-[var(--primary-color)]"
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" className="text-text-secondary">
                        {feature.description}
                      </Typography>
                    </MotionCard>
                  </motion.div>
                </Grid2>
              ))}
            </Grid2>
          </Container>
        </section>
      </PageTransition>
    </PublicLayout>
  )
}
