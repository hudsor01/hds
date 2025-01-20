'use client'

import { DashboardStats, type PropertyStats } from '@/components/dashboard/dashboard-stats'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { RecentActivityList } from '@/components/dashboard/recent-activity'
import type { RecentActivity } from '@/lib/types/dashboard'

// Mock data for testing
const mockActivities: RecentActivity[] = []
const mockStats: PropertyStats = {
  totalProperties: 15,
  activeTenants: 126,
  monthlyRevenue: 148500,
  occupancyRate: 92,
  percentageChanges: {
    properties: 6.7,
    tenants: 4.5,
    revenue: 12.3,
    occupancy: 2.1
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="w-full">
          <DashboardStats stats={mockStats} />
        </div>
        <div className="w-full">
          <DashboardStats stats={mockStats} />
        </div>
        <div className="w-full">
          <DashboardStats stats={mockStats} />
        </div>
        <div className="w-full">
          <DashboardStats stats={mockStats} />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="w-full">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div className="w-full md:col-span-2">
          <RecentActivityList activities={mockActivities} />
        </div>
      </div>
    </div>
  )
}
