export type ActivityType = 'property' | 'payment' | 'maintenance' | 'tenant'

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: Date
  metadata?: Record<string, string>
}
