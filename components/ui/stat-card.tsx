'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  bgClass?: string
  iconClass?: string
}

export function StatCard({ icon, label, value, trend, bgClass = 'bg-blue-50', iconClass = 'text-blue-500' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`rounded-xl p-6 ${bgClass}`}
    >
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${iconClass} bg-white/50`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            <span className="mr-1">{trend.isPositive ? '↑' : '↓'}</span>
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </motion.div>
  )
}