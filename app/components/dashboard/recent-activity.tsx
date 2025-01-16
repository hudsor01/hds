'use client'

import { Card } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { RecentActivity } from '@/types/dashboard'
import { formatDistanceToNow } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Box, CreditCard, FileText, Tool } from 'react-feather'

interface RecentActivityListProps {
  activities: RecentActivity[]
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  const [filter, setFilter] = useState<RecentActivity['type'] | 'ALL'>('ALL')

  const getIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'APPLICATION':
        return FileText
      case 'MAINTENANCE':
        return Tool
      case 'PAYMENT':
        return CreditCard
      default:
        return Box
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500'
      case 'in progress':
        return 'bg-blue-500'
      case 'completed':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const filteredActivities = activities.filter(activity =>
    filter === 'ALL' ? true : activity.type === filter
  )

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h2>
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value: string | undefined) =>
            setFilter(value as RecentActivity['type'] | 'ALL' || 'ALL')}
          className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1"
        >
          <ToggleGroupItem value="ALL" className="text-xs px-3">All</ToggleGroupItem>
          <ToggleGroupItem value="APPLICATION" className="text-xs px-3">Applications</ToggleGroupItem>
          <ToggleGroupItem value="MAINTENANCE" className="text-xs px-3">Maintenance</ToggleGroupItem>
          <ToggleGroupItem value="PAYMENT" className="text-xs px-3">Payments</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-6"
        >
          {filteredActivities.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No activities found
            </p>
          ) : (
            filteredActivities.map((activity) => {
              const Icon = getIcon(activity.type)
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {activity.title}
                      </p>
                      <time className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                      </time>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    {activity.status && (
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium">
                        <span className={`mr-1.5 h-2 w-2 rounded-full ${getStatusColor(activity.status)}`} />
                        {activity.status}
                      </span>
                    )}
                  </div>
                </motion.div>
              )
            })
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  )
}
