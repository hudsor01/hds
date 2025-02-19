'use client'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

interface AnalyticsData {
  propertyCount: number
  tenantCount: number
  leaseCount: number
  totalRentRevenue: number
  occupancyRate: number
  revenueByProperty: { name: string; revenue: number }[]
}

const PerformanceChart = dynamic(() => import('@/components/performance-chart').then(mod => mod.PerformanceChart), {
  ssr: false
})

const BarChart = dynamic(() => import(/Data Display/bar-chart').then(mod => mod.BarChart), {
  ssr: false
})

const financialPerformance = {
  monthlyTrend: [
    { month: 'Jan', revenue: 50000, expenses: 30000 },
    { month: 'Feb', revenue: 55000, expenses: 32000 },
    { month: 'Mar', revenue: 60000, expenses: 35000 }
  ]
}

const propertyOccupancy = {
  BuildingA: 95,
  BuildingB: 88,
  BuildingC: 92
}

const tenantInsights = {
  satisfaction: {
    current: 4.5
  },
  maintenance: {
    avgResolutionTime: {
      completed: 3
    }
  },
  retention: {
    '2024': 85
  }
}

export default function Analytics ()
{
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    const { data: properties } = await supabase.from("properties").select("id, name")
    const { data: tenants } = await supabase.from("tenants").select("id")
    const { data: leases } = await supabase.from("leases").select("*")

    const propertyCount = properties?.length || 0
    const tenantCount = tenants?.length || 0
    const leaseCount = leases?.length || 0

    const totalRentRevenue = leases?.reduce((sum, lease) => sum + lease.rent_amount, 0) || 0
    const occupancyRate = (leaseCount / propertyCount) * 100

    const revenueByProperty =
      properties?.map((property) => {
        const propertyLeases = leases?.filter((lease) => lease.property_id === property.id) || []
        const revenue = propertyLeases.reduce((sum, lease) => sum + lease.rent_amount, 0)
        return { name: property.name, revenue }
      }) || []

    setAnalyticsData({
      propertyCount,
      tenantCount,
      leaseCount,
      totalRentRevenue,
      occupancyRate,
      revenueByProperty,
    })
  }

  if (!analyticsData) {
    return <Typography>Loading analytics data...</Typography>
  }
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Analytics Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Financial Performance */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Financial Performance
              </Typography>
              <PerformanceChart
                data={financialPerformance.monthlyTrend.map(item => ({
                  name: item.month,
                  revenue: item.revenue,
                  expenses: item.expenses
                }))}
              />
            </Paper>
          </Grid>

          {/* Tenant Activity */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Tenant Activity
              </Typography>
            </Paper>
          </Grid>

          {/* Revenue Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Revenue Distribution
              </Typography>
            </Paper>
          </Grid>

          {/* Property Occupancy */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Property Occupancy Rates
              </Typography>
              <BarChart
                data={Object.entries(propertyOccupancy).map(([name, value]) => ({
                  name,
                  value
                }))}
              />
            </Paper>
          </Grid>

          {/* Tenant Insights */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Tenant Insights
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary">
                      {tenantInsights.satisfaction.current}
                    </Typography>
                    <Typography variant="subtitle1">Average Satisfaction Rating</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="success.main">
                      {tenantInsights.maintenance.avgResolutionTime.completed}
                    </Typography>
                    <Typography variant="subtitle1">Days Average Resolution Time</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="info.main">
                      {tenantInsights.retention['2024']}%
                    </Typography>
                    <Typography variant="subtitle1">Tenant Retention Rate</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  )
}
