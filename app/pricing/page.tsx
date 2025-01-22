'use client'

import { Box, Button, Checkbox, Container, FormControlLabel, Paper, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { ArrowRight } from 'react-feather'

// Add Stripe Branding Assets
const stripeBadge = 'https://storage.googleapis.com/brigad-production/resources/stripe-badge-white.png'
const stripeLock = 'https://b.stripecdn.com/docs-statics-srv/assets/e1d09a7bdade3d3a0af7ede5d5325600.svg'

// Price Calculator Component
const PriceCalculator = ({ basePrice, annualDiscount }: { basePrice: number, annualDiscount: number }) => {
  const [propertyCount, setPropertyCount] = useState(10)
  const [annualBilling, setAnnualBilling] = useState(true)
  const [addOns, setAddOns] = useState({
    premiumSupport: false,
    customBranding: false,
    apiAccess: false
  })

  const calculatePrice = () => {
    let price = basePrice * propertyCount
    if (annualBilling) price *= 0.8 // 20% annual discount
    if (addOns.premiumSupport) price += 49
    if (addOns.customBranding) price += 99
    if (addOns.apiAccess) price += 149
    return price.toFixed(2)
  }

  return (
    <Paper sx={{ p: 4, mb: 8, borderRadius: 4 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>Price Calculator</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom>Number of Properties: {propertyCount}</Typography>
        <Slider
          value={propertyCount}
          onChange={(e, v) => setPropertyCount(v as number)}
          min={1}
          max={100}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={<Checkbox checked={annualBilling} onChange={(e) => setAnnualBilling(e.target.checked)} />}
          label={`Annual Billing (Save ${annualDiscount}%)`}
        />
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Add-ons:</Typography>
        <FormControlLabel
          control={<Checkbox checked={addOns.premiumSupport} onChange={(e) => setAddOns({...addOns, premiumSupport: e.target.checked})} />}
          label="24/7 Premium Support (+$49/month)"
        />
        <FormControlLabel
          control={<Checkbox checked={addOns.customBranding} onChange={(e) => setAddOns({...addOns, customBranding: e.target.checked})} />}
          label="Custom Branding (+$99/month)"
        />
        <FormControlLabel
          control={<Checkbox checked={addOns.apiAccess} onChange={(e) => setAddOns({...addOns, apiAccess: e.target.checked})} />}
          label="API Access (+$149/month)"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          ${calculatePrice()}
          <Typography component="span" sx={{ ml: 1, color: 'text.secondary' }}>
            /{annualBilling ? 'year' : 'month'}
          </Typography>
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowRight />}
          sx={{ ml: 2 }}
        >
          Continue to Payment
        </Button>
      </Box>

      {/* Stripe Security Badge */}
      <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <img src={stripeLock} alt="Secure Payment" style={{ height: 32 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Payments securely processed by Stripe
        </Typography>
      </Box>
    </Paper>
  )
}

// Feature Comparison Table
const FeatureComparisonTable = () => {
  const features = [
    { name: 'Number of Properties', free: '3', starter: '10', pro: '50', enterprise: 'Unlimited' },
    { name: 'Document Storage', free: '1GB', starter: '5GB', pro: '20GB', enterprise: '100GB+' },
    { name: 'Priority Support', free: '✗', starter: '✓', pro: '24/7', enterprise: 'Dedicated' },
    { name: 'Custom Branding', free: '✗', starter: '✗', pro: '✓', enterprise: '✓' },
    { name: 'API Access', free: '✗', starter: '✗', pro: 'Basic', enterprise: 'Full' },
    { name: 'SLA Guarantee', free: '✗', starter: '✗', pro: '✗', enterprise: '✓' }
  ]

  return (
    <Box sx={{ my: 8 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>Feature Comparison</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="feature comparison table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>Feature</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Free</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Starter</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Professional</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Enterprise</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {features.map((feature) => (
              <TableRow key={feature.name}>
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {feature.name}
                </TableCell>
                <TableCell align="center">{feature.free}</TableCell>
                <TableCell align="center">{feature.starter}</TableCell>
                <TableCell align="center">{feature.pro}</TableCell>
                <TableCell align="center">{feature.enterprise}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

// Updated PricingPage component
export default function PricingPage() {
  const theme = useTheme()
  const [annualBilling, setAnnualBilling] = useState(true)

  return (
    <Box sx={{ overflow: 'hidden', bgcolor: 'background.default' }}>
      {/* ... (keep previous header content) */}

      <Container maxWidth="lg" sx={{ mt: -8, mb: 15, position: 'relative' }}>
        {/* Add Price Calculator */}
        <PriceCalculator basePrice={49} annualDiscount={20} />

        {/* Add Feature Comparison Table */}
        <FeatureComparisonTable />

        {/* ... (rest of existing pricing page content) */}

        {/* Stripe Branding Section */}
        <Box sx={{ mt: 8, textAlign: 'center', py: 6, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Secure Payment Processing
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center' }}>
            <img src={stripeBadge} alt="Stripe Badge" style={{ height: 40 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 600 }}>
              All payments are securely processed through Stripe, a PCI Service Provider Level 1 certified
              payment processor. We never store your credit card information.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
