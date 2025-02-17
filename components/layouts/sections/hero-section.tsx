'use client'

import { Container } from '@/components/layouts/container'
import { Button } from '@/components/button'
import { Typography } from '@mui/material'
import React from 'react'

export function HeroSection(): React.ReactElement {
  return (
    <section className="bg-background-ui relative py-24">
      <Container className="text-center">
        <Typography variant="h1" className="text-text-primary mb-8 text-5xl font-bold">
          A Platform for Property Management
        </Typography>
        <Typography variant="body1" className="text-text-secondary mb-12 text-lg">
          Streamline your real estate operations with our comprehensive platform.
        </Typography>
        <Button href="/sign-up" size="lg">
          Get Started
        </Button>
      </Container>
    </section>
  )
}
