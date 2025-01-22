'use client'

import { PropertyStats, RecentActivity } from '@/types/dashboard'
import { useEffect } from 'react'
import { toast } from '../components/ui/use-toast'

export type DashboardEvent = {
  type: 'STATS_UPDATE' | 'NEW_ACTIVITY'
  data: {
    stats?: PropertyStats
    activity?: RecentActivity
  }
}

export function useDashboardUpdates(onUpdate: (event: DashboardEvent) => void) {
  useEffect(() => {
    const eventSource = new EventSource('/api/dashboard/events')

    eventSource.onmessage = (event) => {
      const dashboardEvent = JSON.parse(event.data) as DashboardEvent
      onUpdate(dashboardEvent)

      // Show toast for new activities
      if (dashboardEvent.type === 'NEW_ACTIVITY' && dashboardEvent.data.activity) {
        toast({
          title: 'New Activity',
          description: dashboardEvent.data.activity.description,
        })
      }
    }

    eventSource.onerror = () => {
      console.error('EventSource failed to connect')
      eventSource.close()
    }

    return () => eventSource.close()
  }, [onUpdate])
}
