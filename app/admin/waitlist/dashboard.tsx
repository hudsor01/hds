'use client'

import { getWaitlistStats } from '@/lib/services/waitlist-analytics'
import type { WaitlistStats } from '@/types/waitlist-analytics'
import { Box, Card, CardContent, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`waitlist-tabpanel-${index}`}
      aria-labelledby={`waitlist-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

export default function WaitlistDashboard() {
  const [tabValue, setTabValue] = useState(0)
  const [dateRange, setDateRange] = useState('30d')

  const { data: stats, isLoading } = useQuery<WaitlistStats>({
    queryKey: ['waitlist-stats', dateRange],
    queryFn: () => getWaitlistStats(),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!stats) {
    return <div>No data available</div>
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Waitlist Dashboard
        </Typography>
        <Typography color="text.secondary">Monitor and manage your waitlist performance</Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Signups
              </Typography>
              <Typography variant="h4">{stats.conversion.total_signups}</Typography>
              <Typography variant="body2" color="text.secondary">
                {stats.daily[0]?.signups || 0} today
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h4">{stats.conversion.rate.toFixed(1)}%</Typography>
              <Typography variant="body2" color="text.secondary">
                of {stats.conversion.total_views} views
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Referrals
              </Typography>
              <Typography variant="h4">
                {stats.referrals.reduce((sum, ref) => sum + ref.referral_count, 0)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                from {stats.referrals.length} referrers
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Sources
              </Typography>
              <Typography variant="h4">{stats.sources.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                active channels
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
            <Tab label="Growth" />
            <Tab label="Referrals" />
            <Tab label="Sources" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={stats.daily}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="signups"
                  stroke="#007FFF"
                  fill="#007FFF"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={stats.referrals}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="referrer_email" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="referral_count" fill="#007FFF" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={stats.sources}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#007FFF" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </TabPanel>
      </Card>
    </Container>
  )
}
