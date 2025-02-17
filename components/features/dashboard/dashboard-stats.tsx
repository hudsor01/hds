'use client'

import { DashboardCard } from './dashboard-card'
import { formatCurrency } from '@/lib/utils'

interface DashboardStatsProps {
  propertyCount: number
  tenantCount: number
  leaseCount: number
  maintenanceCount: number
  totalRevenue: number
}

export function DashboardStats({ propertyCount, tenantCount, leaseCount, maintenanceCount, totalRevenue }: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total Properties"
        value={propertyCount}
        description="Active properties"
        icon={<Building2 className="text-muted-foreground h-4 w-4" />}
      />
      <DashboardCard
        title="Active Tenants"
        value={tenantCount}
        description="Current tenants"
        icon={<Users2 className="text-muted-foreground h-4 w-4" />}
      />
      <DashboardCard
        title="Active Leases"
        value={leaseCount}
        description="Current leases"
        icon={<FileText className="text-muted-foreground h-4 w-4" />}
      />
      <DashboardCard
        title="Maintenance Requests"
        value={maintenanceCount}
        description="Pending requests"
        icon={<Wrench className="text-muted-foreground h-4 w-4" />}
      />
    </div>
  )
}
