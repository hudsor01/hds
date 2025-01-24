export type RecentActivity = {
  id: string
  type: 'APPLICATION' | 'MAINTENANCE' | 'PAYMENT'
  title: string
  description: string
  timestamp: Date
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'
  priority?: 'low' | 'medium' | 'high'
  amount?: number
}

export interface PropertyStats {
  totalProperties: number
  activeTenants: number
  monthlyRevenue: number
  occupancyRate: number
  percentageChanges: {
    properties: number
    tenants: number
    revenue: number
    occupancy: number
  }
}
