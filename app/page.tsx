'use client'

import
  {
    People as PeopleIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon
  } from '@mui/icons-material'
import
  {
    AppBar, Button,
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography, useTheme
  } from '@mui/material'
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function Home() {
  const { data: session } = useSession()
  const theme = useTheme()

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <AppBar position="static" className="bg-white shadow-none">
        <Toolbar className="max-w-7xl mx-auto w-full justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand */}
          <Typography
            component="a"
            href="/"
            className="text-gray-900 font-bold text-2xl no-underline"
          >
            Hudson Digital Solutions
          </Typography>

          {/* Center: Navigation Links */}
          <div className="flex-1 flex justify-center gap-8">
            <Button component={Link} href="/features" className="text-gray-600 hover:text-gray-900">
              Features
            </Button>
            <Button component={Link} href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Button>
          </div>

          {/* Right: Auth Buttons */}
          <div className="flex gap-4">
            {!session && (
              <>
                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  className="border-primary-500 text-primary-500 hover:bg-primary-50"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  href="/pricing"
                  variant="contained"
                  className="bg-primary-500 hover:bg-primary-600 text-white"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container className="py-24 text-center">
        <Typography variant="h2" component="h1" className="text-primary-500 font-medium mb-2">
          Simplify
        </Typography>
        <Typography variant="h2" className="text-gray-900 mb-8">
          Property Management
        </Typography>
        <Typography variant="h5" className="text-gray-600 max-w-3xl mx-auto mb-12">
          Streamline your property management with our comprehensive platform. From
          rent collection to maintenance requests, we've got you covered.
        </Typography>
        <div className="flex justify-center gap-4">
          <Button
            component={Link}
            href="/pricing"
            variant="contained"
            size="large"
            className="bg-primary-500 hover:bg-primary-600 text-white px-8"
          >
            Get Started
          </Button>
          <Button
            component={Link}
            href="/features"
            variant="outlined"
            size="large"
            className="border-primary-500 text-primary-500 hover:bg-primary-50 px-8"
          >
            Learn More
          </Button>
        </div>
      </Container>

      {/* Features Section */}
      <div className="bg-gray-50 py-24">
        <Container>
          <Typography variant="h3" className="text-center mb-4">
            Powerful <span className="text-primary-500">Features</span>
          </Typography>
          <Typography variant="h6" className="text-center text-gray-600 mb-12">
            Everything you need to manage your properties efficiently
          </Typography>

          <Grid container spacing={4}>
            {[
              {
                icon: <SpeedIcon />,
                title: "Smart Property Management",
                description: "Streamline your property operations with our intelligent management tools and automated workflows."
              },
              {
                icon: <SecurityIcon />,
                title: "Secure Data Handling",
                description: "Your data is protected with enterprise-grade security and regular backups."
              },
              {
                icon: <PeopleIcon />,
                title: "Multi-tenant Support",
                description: "Manage multiple properties and tenants from a single, unified dashboard."
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper className="p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-primary-500">{feature.icon}</span>
                  </div>
                  <Typography variant="h6" className="mb-4">
                    {feature.title}
                  </Typography>
                  <Typography className="text-gray-600">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>
  )
}
