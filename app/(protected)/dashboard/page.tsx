'use client'

import {
    Box,
    Container,
    Grid,
    Paper,
    Typography
} from '@mui/material'
import { motion } from 'framer-motion'
import {
    PropertyOverview,
    RevenueChart,
    TenantsOverview,
    RecentActivity,
    MaintenanceStatus,
    QuickActions
} from './components'

export default function DashboardPage() {
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        gutterBottom
                    >
                        Welcome back, Richard
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        color="text.secondary"
                    >
                        Here's what's happening with your properties
                        today.
                    </Typography>
                </Box>
            </motion.div>

            <Grid container spacing={3}>
                {/* Property Overview */}
                <Grid item xs={12} lg={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <PropertyOverview />
                    </motion.div>
                </Grid>

                {/* Quick Actions */}
                <Grid item xs={12} lg={4}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <QuickActions />
                    </motion.div>
                </Grid>

                {/* Revenue Chart */}
                <Grid item xs={12} lg={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <RevenueChart />
                    </motion.div>
                </Grid>

                {/* Tenants Overview */}
                <Grid item xs={12} lg={4}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <TenantsOverview />
                    </motion.div>
                </Grid>

                {/* Maintenance Status */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <MaintenanceStatus />
                    </motion.div>
                </Grid>

                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <RecentActivity />
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    )
}
