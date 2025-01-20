'use client'

import type { RecentActivity } from "@/lib/types/dashboard"
import { cn } from "@/lib/utils"
import { Card, CardContent, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { motion } from "framer-motion"
import { useState } from "react"
import { AlertCircle, CreditCard, FileText, Tool } from "react-feather"

interface RecentActivityListProps {
  activities: RecentActivity[]
}

const listVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const itemVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 }
}

export function RecentActivityList({ activities }: RecentActivityListProps) {
  const [filter, setFilter] = useState<'ALL' | 'APPLICATION' | 'MAINTENANCE' | 'PAYMENT'>('ALL')

  const getIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'APPLICATION':
        return FileText
      case 'MAINTENANCE':
        return Tool
      case 'PAYMENT':
        return CreditCard
      default:
        return AlertCircle
    }
  }

  const getStatusColor = (status: RecentActivity['status']) => {
    switch (status) {
      case 'PENDING':
        return 'yellow'
      case 'IN_PROGRESS':
        return 'blue'
      case 'COMPLETED':
        return 'green'
      default:
        return 'gray'
    }
  }

  const getPriorityColor = (priority: RecentActivity['priority']) => {
    switch (priority) {
      case 'low':
        return 'blue'
      case 'medium':
        return 'yellow'
      case 'high':
        return 'red'
      default:
        return 'gray'
    }
  }

  const filteredActivities = activities.filter(
    activity => filter === 'ALL' || activity.type === filter
  )

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={(_, value) => value && setFilter(value)}
              size="small"
            >
              <ToggleButton value="ALL">All</ToggleButton>
              <ToggleButton value="APPLICATION">Applications</ToggleButton>
              <ToggleButton value="MAINTENANCE">Maintenance</ToggleButton>
              <ToggleButton value="PAYMENT">Payments</ToggleButton>
            </ToggleButtonGroup>
          </div>
          <motion.div
            className="space-y-4"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={listVariants}
          >
            {filteredActivities.length === 0 ? (
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-center justify-center py-8 text-gray-500"
              >
                <AlertCircle className="h-12 w-12 mb-4" />
                <p className="text-sm">No recent activities found</p>
              </motion.div>
            ) : (
              filteredActivities.map((activity) => {
                const Icon = getIcon(activity.type)
                const statusColor = getStatusColor(activity.status)
                const priorityColor = activity.priority ? getPriorityColor(activity.priority) : null

                return (
                  <motion.div
                    key={activity.id}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "p-2 rounded-full",
                        activity.type === 'APPLICATION' && "bg-purple-100 text-purple-600",
                        activity.type === 'MAINTENANCE' && "bg-blue-100 text-blue-600",
                        activity.type === 'PAYMENT' && "bg-green-100 text-green-600"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium truncate">{activity.title}</p>
                        <div className="flex items-center gap-2">
                          {activity.priority && (
                            <span className={cn(
                              "px-2 py-1 text-xs font-medium rounded-full",
                              priorityColor === 'blue' && "bg-blue-100 text-blue-600",
                              priorityColor === 'yellow' && "bg-yellow-100 text-yellow-600",
                              priorityColor === 'red' && "bg-red-100 text-red-600",
                              priorityColor === 'gray' && "bg-gray-100 text-gray-600"
                            )}>
                              {activity.priority}
                            </span>
                          )}
                          <span className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            statusColor === 'yellow' && "bg-yellow-100 text-yellow-600",
                            statusColor === 'blue' && "bg-blue-100 text-blue-600",
                            statusColor === 'green' && "bg-green-100 text-green-600",
                            statusColor === 'gray' && "bg-gray-100 text-gray-600"
                          )}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        {activity.description}
                      </p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <time dateTime={activity.timestamp.toISOString()}>
                          {new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          }).format(activity.timestamp)}
                        </time>
                        {activity.amount && (
                          <span>
                            {new Intl.NumberFormat('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            }).format(activity.amount)}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })
            )}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
