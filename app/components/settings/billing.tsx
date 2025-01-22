'use client'

import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography
} from '@mui/material'
import { CreditCard, Download } from 'react-feather'

export function BillingSettings() {
  const currentPlan = {
    name: 'Professional',
    price: 29.99,
    billingCycle: 'monthly',
    features: [
      'Up to 100 properties',
      'Advanced analytics',
      'Email support',
      'API access'
    ]
  }

  const billingHistory = [
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 29.99,
      status: 'paid'
    },
    {
      id: 'INV-2023-012',
      date: '2023-12-15',
      amount: 29.99,
      status: 'paid'
    },
    {
      id: 'INV-2023-011',
      date: '2023-11-15',
      amount: 29.99,
      status: 'paid'
    }
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Billing & Subscription
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage your subscription plan and billing information
      </Typography>

      <Grid container spacing={4}>
        {/* Current Plan */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Current Plan
                  </Typography>
                  <Typography variant="h5" color="primary.main">
                    {currentPlan.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${currentPlan.price}/month
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Plan Features
                  </Typography>
                  <Stack spacing={1}>
                    {currentPlan.features.map((feature, index) => (
                      <Typography key={index} variant="body2">
                        • {feature}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary">
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ ml: 2 }}
                  >
                    Cancel Subscription
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Method */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Payment Method
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                    <CreditCard size={20} />
                    <Box>
                      <Typography variant="body2">
                        •••• •••• •••• 4242
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Expires 12/2024
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<CreditCard size={16} />}
                  >
                    Update Payment Method
                  </Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Billing History
            </Typography>
            <Card variant="outlined">
              <Stack divider={<Divider />}>
                {billingHistory.map((invoice) => (
                  <Box
                    key={invoice.id}
                    sx={{
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Stack spacing={0.5}>
                      <Typography variant="body2">
                        {invoice.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(invoice.date).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Typography variant="body2">
                        ${invoice.amount}
                      </Typography>
                      <Chip
                        label={invoice.status}
                        size="small"
                        color="success"
                      />
                      <Button
                        size="small"
                        startIcon={<Download size={16} />}
                      >
                        PDF
                      </Button>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
