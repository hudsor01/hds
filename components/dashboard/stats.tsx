// components/dashboard/stats.tsx
import { Card } from '@/components/ui/cards/card'
import { DollarSign, Home, Tool, User } from 'react-feather'

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Properties"
        value="5"
        trend="+1 this month"
        icon={Home}
        trendDirection="up"
      />
      <StatCard
        title="Active Tenants"
        value="12"
        trend="92% occupancy"
        icon={User}
        trendDirection="neutral"
      />
      <StatCard
        title="Pending Maintenance"
        value="3"
        trend="2 urgent"
        icon={Tool}
        trendDirection="down"
      />
      <StatCard
        title="Monthly Revenue"
        value="$15,750"
        trend="+12% from last month"
        icon={DollarSign}
        trendDirection="up"
      />
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  trend: string
  icon: React.ComponentType<{ className?: string }>
  trendDirection: 'up' | 'down' | 'neutral'
}

function StatCard({ title, value, trend, icon: Icon, trendDirection }: StatCardProps) {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }[trendDirection]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
          <p className={`mt-2 text-sm ${trendColor}`}>{trend}</p>
        </div>
        <Icon className="text-pastel-blue-500 h-12 w-12" />
      </div>
    </Card>
  )
}

// Skeleton loader for the stats section
DashboardStats.Skeleton = function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse p-6">
          <div className="h-20 rounded bg-gray-200" />
        </Card>
      ))}
    </div>
  )
}
