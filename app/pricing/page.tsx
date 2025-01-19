'use client'

import {
    Alert,
    Box,
    Button,
    Container,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    Typography,
    useTheme
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Award, Check, Clock, Star } from "react-feather"
import { toast } from "sonner"

const PricingCard = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.shadows[8],
    '& .MuiButton-root': {
      transform: 'scale(1.05)',
    },
  },
}))

const PopularBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  right: 24,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '4px 12px',
  borderRadius: 16,
  fontSize: '0.875rem',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}))

const TrialBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -12,
  left: 24,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.primary.contrastText,
  padding: '4px 12px',
  borderRadius: 16,
  fontSize: '0.875rem',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}))

const tiers = [
  {
    name: 'Starter',
    price: { monthly: 29, annual: 290 },
    description: 'Perfect for individual property owners',
    features: [
      'Up to 2 properties',
      'Basic tenant portal',
      'Maintenance requests',
      'Online rent payments',
      'Basic document storage',
      'Email support',
      'Mobile app access',
      'Basic lease templates',
      'Simple financial reports',
      'Property listing page',
    ],
  },
  {
    name: 'Basic',
    price: { monthly: 49, annual: 470 },
    description: 'Great for small property owners',
    features: [
      'Up to 5 properties',
      'Enhanced tenant portal',
      'Maintenance tracking',
      'Online payments',
      'Document management',
      'Email & chat support',
      'Basic reporting',
      'Mobile app with notifications',
      'Custom lease templates',
      'Tenant screening basic',
      'Property photos & virtual tours',
      'Basic accounting integration',
      'Maintenance vendor portal',
    ],
  },
  {
    name: 'Professional',
    price: { monthly: 99, annual: 950 },
    description: 'Ideal for growing portfolios',
    features: [
      'Up to 20 properties',
      'Advanced tenant portal',
      'Maintenance management',
      'Online payments & accounting',
      'Document management',
      'Priority support',
      'Financial reporting',
      'Tenant screening',
      'Lease management',
      'Advanced mobile features',
      'Marketing tools & listings',
      'Automated rent reminders',
      'Maintenance scheduling',
      'Property inspection tools',
      'Tenant communication system',
      'Basic API access',
    ],
    popular: true,
  },
  {
    name: 'Business',
    price: { monthly: 299, annual: 2890 },
    description: 'For property management companies',
    features: [
      'Up to 50 properties',
      'White-label tenant portal',
      'Advanced maintenance system',
      'Full accounting suite',
      'Document automation',
      'Priority 24/7 support',
      'Custom reporting',
      'API access',
      'Team management',
      'Analytics dashboard',
      'Custom workflows',
      'Bulk operations',
      'Advanced tenant screening',
      'Multi-location support',
      'Revenue optimization tools',
      'Integration capabilities',
      'Automated marketing',
      'Advanced security features',
    ],
  },
  {
    name: 'Enterprise',
    price: { monthly: 599, annual: 5790 },
    description: 'Custom solutions for large portfolios',
    features: [
      'Unlimited properties',
      'Custom tenant portal',
      'Custom maintenance workflows',
      'Advanced financial suite',
      'Advanced automations',
      'Dedicated support team',
      'Custom reporting & API',
      'Data migration assistance',
      'Custom integrations',
      'SLA guarantees',
      'Onboarding manager',
      'Custom AI solutions',
      'Advanced analytics',
      'Market insights',
      'Portfolio optimization',
      'Risk management tools',
      'Compliance monitoring',
      'Executive dashboard',
      'Strategic consulting',
      'Custom development',
    ],
  },
]

// Enhanced animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
}

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
}

export default function PricingPage() {
  const theme = useTheme()
  const router = useRouter()
  const { data: session } = useSession()
  const [isAnnual, setIsAnnual] = useState(false)

  const handleStartTrial = async (tierName: string) => {
    if (!session) {
      // Store selected plan in localStorage for after registration
      localStorage.setItem('selectedPlan', tierName)
      router.push('/register')
      return
    }

    try {
      // Here you would typically call your subscription API
      toast.success(`Starting your trial of the ${tierName} plan`)
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to start trial. Please try again.')
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Free Trial Banner */}
        <Alert
          severity="info"
          icon={<Clock size={24} />}
          sx={{
            mb: 4,
            maxWidth: 'md',
            mx: 'auto',
            '& .MuiAlert-icon': {
              alignItems: 'center'
            }
          }}
        >
          <Typography variant="subtitle1">
            Try any plan free for 14 days. No credit card required.
          </Typography>
        </Alert>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Choose Your Plan
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Scale your property management with the right features
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={isAnnual}
                onChange={(e) => setIsAnnual(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Typography variant="body1">
                {isAnnual ? 'Annual billing' : 'Monthly billing'}
                {isAnnual && (
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      px: 1,
                      py: 0.5,
                      bgcolor: 'success.light',
                      color: 'success.dark',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    Save up to 20%
                  </Box>
                )}
              </Typography>
            }
          />
        </Box>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <Grid container spacing={3}>
          {tiers.map((tier, tierIndex) => (
            <Grid item xs={12} md={6} lg={tier.popular ? 12 : 6} xl={tier.popular ? 12 : 6} key={tier.name}>
              <motion.div
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PricingCard
                  elevation={tier.popular ? 4 : 1}
                  sx={{
                    borderColor: tier.popular ? 'primary.main' : 'divider',
                    borderWidth: tier.popular ? 2 : 1,
                    borderStyle: 'solid',
                  }}
                >
                  {tier.popular && (
                    <PopularBadge>
                      <Star size={16} />
                      Most Popular
                    </PopularBadge>
                  )}
                  <TrialBadge>
                    <Clock size={16} />
                    14-Day Free Trial
                  </TrialBadge>

                  <Typography variant="h5" component="h2" gutterBottom>
                    {tier.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {tier.description}
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{ fontWeight: 700 }}
                    >
                      ${isAnnual ? tier.price.annual : tier.price.monthly}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="span"
                      color="text.secondary"
                    >
                      /{isAnnual ? 'year' : 'month'}
                    </Typography>
                  </Box>

                  <Box sx={{ flexGrow: 1 }}>
                    {tier.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        variants={featureVariants}
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                            opacity: 1 - (index * 0.05),
                          }}
                        >
                          <Check
                            size={20}
                            color={theme.palette.primary.main}
                          />
                          <Typography variant="body2">
                            {feature}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={tier.popular ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      sx={{
                        mt: 4,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: theme.shadows[4],
                        }
                      }}
                      onClick={() => handleStartTrial(tier.name)}
                    >
                      {session ? 'Start Free Trial' : 'Get Started'}
                    </Button>
                  </motion.div>
                </PricingCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Enterprise Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography color="text.secondary">
            Need a custom solution?{' '}
            <Button
              color="primary"
              endIcon={<Award size={16} />}
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              Contact our sales team
            </Button>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  )
}
