'use client'

import { useCallback, useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

// Zod schema for event validation
const DashboardEventSchema = z.object({
  type: z.enum(['STATS_UPDATE', 'NEW_ACTIVITY']),
  data: z.object({
    stats: z.any().optional(),
    activity: z.object({
      description: z.string(),
      type: z.string()
    }).optional()
  })
})

export type DashboardEvent = z.infer<typeof DashboardEventSchema>

type UseDashboardUpdatesProps = {
  onUpdateAction: (event: DashboardEvent) => void
  onError?: (error: Error) => void
  reconnectInterval?: number
}

export function useDashboardUpdates({
  onUpdateAction,
  onError,
  reconnectInterval = 5000
}: UseDashboardUpdatesProps) {
  const stableOnUpdate = useCallback(onUpdateAction, [onUpdateAction])

  useEffect(() => {
    let eventSource: EventSource | null = null
    let reconnectTimeout: NodeJS.Timeout

    const connect = () => {
      eventSource = new EventSource('/api/dashboard/events')

      const handleMessage = (event: MessageEvent) => {
        try {
          const parsedData = JSON.parse(event.data)
          const result = DashboardEventSchema.safeParse(parsedData)

          if (!result.success) {
            throw new Error('Invalid event format')
          }

          const dashboardEvent = result.data
          stableOnUpdate(dashboardEvent)

          if (dashboardEvent.type === 'NEW_ACTIVITY' && dashboardEvent.data.activity) {
            toast(dashboardEvent.data.activity.description, {
              description: `New ${dashboardEvent.data.activity.type} activity`,
              duration: 5000
            })
          }
        } catch (error) {
          console.error('Error processing SSE message:', error)
          onError?.(new Error('Failed to process server event'))
        }
      }

      const handleError = () => {
        console.error('SSE connection error')
        eventSource?.close()
        reconnectTimeout = setTimeout(connect, reconnectInterval)
      }

      eventSource.addEventListener('message', handleMessage)
      eventSource.addEventListener('error', handleError)

      return () => {
        eventSource?.removeEventListener('message', handleMessage)
        eventSource?.removeEventListener('error', handleError)
        eventSource?.close()
      }
    }

    connect()

    return () => {
      clearTimeout(reconnectTimeout)
      eventSource?.close()
    }
  }, [stableOnUpdate, onError, reconnectInterval])
}
