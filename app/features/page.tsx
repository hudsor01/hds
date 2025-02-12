'use client'

import { Card } from '@/components/ui/cards/card'
import { Box, Container, Grid, Typography } from '@mui/material'
import {
  BarChart,
  Calendar,
  CreditCard,
  FileText,
  Home,
  MessageCircle,
  Settings,
  Users
} from 'react-feather'

interface Feature {
  title: string
  description: string
  icon: typeof Home
}

const features: Feature[] = [
  {
    title: 'Property Management',
    description: 'Efficiently manage your properties with our comprehensive dashboard.',
    icon: Home
  },
  {
    title: 'Tenant Portal',
    description: 'Give tenants access to a dedicated portal for payments and maintenance requests.',
    icon: Users
  },
  {
    title: 'Financial Tracking',
    description: 'Track rent payments, expenses, and generate financial reports.',
    icon: BarChart
  },
  {
    title: 'Maintenance Management',
    description: 'Handle maintenance requests and track repairs efficiently.',
    icon: Settings
  },
  {
    title: 'Document Management',
    description: 'Store and manage all property-related documents securely.',
    icon: FileText
  },
  {
    title: 'Payment Processing',
    description: 'Process rent payments and security deposits electronically.',
    icon: CreditCard
  },
  {
    title: 'Scheduling',
    description: 'Schedule viewings, maintenance, and other property-related events.',
    icon: Calendar
  },
  {
    title: 'Communication Hub',
    description: 'Streamline communication between property managers, owners, and tenants.',
    icon: MessageCircle
  }
]

export default function FeaturesPage() {
  return (
    <Box className="from-background to-muted/20 min-h-screen bg-gradient-to-b py-20">
      <Container maxWidth="lg">
        <Box className="mb-16 text-center">
          <Typography variant="h2" className="mb-4 font-bold">
            Powerful Features for Property Management
          </Typography>
          <Typography variant="h5" color="text.secondary" className="mx-auto max-w-3xl">
            Everything you need to manage your properties efficiently and grow your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card
                  className="h-full p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Box className="flex h-full flex-col">
                    <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full p-3">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <Typography variant="h6" className="mb-2 font-semibold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
