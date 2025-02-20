'use client'

import { motion } from 'framer-motion'

interface ActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  onClick?: () => void
  bgClass?: string
  iconClass?: string
}

export function ActionCard({ 
  icon, 
  title, 
  description, 
  onClick, 
  bgClass = 'bg-white', 
  iconClass = 'bg-blue-50 text-blue-500' 
}: ActionCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${bgClass} p-4 rounded-xl cursor-pointer transition-shadow hover:shadow-md`}
    >
      <div className={`w-12 h-12 ${iconClass} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </motion.div>
  )
}