'use client'

import React from 'react'
import { Typography, Container } from '@mui/material'

export default function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About Us
      </Typography>

      <Typography variant="body1" paragraph>
        Property Manager is a cutting-edge solution designed to simplify the complex world of property management. Our platform
        empowers property owners, managers, and tenants with tools that streamline operations, enhance communication, and optimize
        property performance.
      </Typography>

      <Typography variant="body1" paragraph>
        Founded in 2023, our team brings together expertise in real estate, technology, and customer service to deliver a
        comprehensive property management experience.
      </Typography>
    </Container>
  )
}
