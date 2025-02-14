'use client'
import { motion } from 'framer-motion'
import { PublicLayout } from '@/components/layout/public-layout'
import { PageTransition } from '@/components/layout/page-transition'
import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { HeroSection } from '@/components/sections/hero-section'
import { Typography, Grid, Box } from '@mui/material'

export default function HomePage() {
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
            <Grid container spacing={4}>
              {[
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
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={feature.title}>
                  <Card
                    variant="default"
                    className="bg-background-ui text-text-primary p-6 transition-shadow duration-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
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
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
      </PageTransition>
    </PublicLayout>
  )
}
