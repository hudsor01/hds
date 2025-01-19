'use client'

import
  {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Toolbar,
    Typography,
    useTheme
  } from "@mui/material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Activity, Shield, Users } from "react-feather"

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}))

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const { data: session } = useSession()
  const theme = useTheme()

  return (
    <Box className="min-h-screen bg-white">
      {/* Navigation */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ maxWidth: 'lg', width: '100%', mx: 'auto' }}>
          <Typography
            component={Link}
            href="/"
            variant="h5"
            sx={{
              color: 'text.primary',
              fontWeight: 700,
              textDecoration: 'none',
              flexGrow: 1
            }}
          >
            Hudson Digital Solutions
          </Typography>

          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button
              component={Link}
              href="/features"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Features
            </Button>
            <Button
              component={Link}
              href="/pricing"
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              Pricing
            </Button>
          </Box>

          {!session && (
            <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                color="primary"
              >
                Login
              </Button>
              <Button
                component={Link}
                href="/pricing"
                variant="contained"
                color="primary"
              >
                Get Started
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container sx={{ py: 12, textAlign: 'center' }}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <Typography
            variant="h2"
            component="h1"
            color="primary"
            sx={{ fontWeight: 700, mb: 1 }}
          >
            Simplify
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: 700, mb: 4 }}
          >
            Property Management
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 'md', mx: 'auto', mb: 6 }}
          >
            Streamline your property management with our comprehensive platform.
            From rent collection to maintenance requests, we've got you covered.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              component={Link}
              href="/pricing"
              variant="contained"
              size="large"
              sx={{ px: 4 }}
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/features"
              variant="outlined"
              size="large"
              sx={{ px: 4 }}
            >
              Learn More
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 12 }}>
        <Container>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="text-center"
          >
            <Typography variant="h3" gutterBottom>
              Powerful <span style={{ color: theme.palette.primary.main }}>Features</span>
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 8 }}
            >
              Everything you need to manage your properties efficiently
            </Typography>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <Grid container spacing={4}>
              {[
                {
                  icon: <Activity size={24} />,
                  title: "Smart Property Management",
                  description: "Streamline your property operations with our intelligent management tools and automated workflows."
                },
                {
                  icon: <Shield size={24} />,
                  title: "Secure Data Handling",
                  description: "Your data is protected with enterprise-grade security and regular backups."
                },
                {
                  icon: <Users size={24} />,
                  title: "Multi-tenant Support",
                  description: "Manage multiple properties and tenants from a single, unified dashboard."
                }
              ].map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div variants={fadeInUp}>
                    <StyledPaper elevation={0}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: 'primary.light',
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 2,
                          color: 'primary.main'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </StyledPaper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  )
}
