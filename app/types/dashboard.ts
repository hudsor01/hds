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
