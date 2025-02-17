'use client'

import { Grid } from '@mui/material'
import { DashboardCard } from './dashboard-card'
import { formatCurrency } from '@/lib/utils'
import { Apartment as BuildingIcon, People as UsersIcon, Description as FileIcon, Build as WrenchIcon } from '@mui/icons-material'

interface DashboardStatsProps {
  propertyCount: number
  tenantCount: number
  leaseCount: number
  maintenanceCount: number
  totalRevenue: number
}

export function DashboardStats({ propertyCount, tenantCount, leaseCount, maintenanceCount, totalRevenue }: DashboardStatsProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <DashboardCard title="Total Properties" value={propertyCount} description="Active properties" icon={<BuildingIcon />} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <DashboardCard title="Active Tenants" value={tenantCount} description="Current tenants" icon={<UsersIcon />} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <DashboardCard title="Active Leases" value={leaseCount} description="Current leases" icon={<FileIcon />} />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <DashboardCard
          title="Maintenance Requests"
          value={maintenanceCount}
          description="Pending requests"
          icon={<WrenchIcon />}
        />
      </Grid>
    </Grid>
  )
}
