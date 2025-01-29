'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthProps): React.ReactElement {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const calculateStrength = (): number => {
      let score = 0
      if (!password) return 0

      // Length check
      if (password.length >= 8) score += 1
      if (password.length >= 12) score += 1

      // Character type checks
      if (/[A-Z]/.test(password)) score += 1
      if (/[0-9]/.test(password)) score += 1
      if (/[^A-Za-z0-9]/.test(password)) score += 1

      return score
    }

    const newStrength = calculateStrength()
    setStrength(newStrength)

    // Set feedback based on strength
    const feedbackMessages = [
      'Very weak',
      'Weak',
      'Fair',
      'Good',
      'Strong',
      'Very strong'
    ]
    setFeedback(feedbackMessages[newStrength] || 'Very weak')
  }, [password])

  const strengthColor = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-green-600'
  ][strength]

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${strengthColor}`}
          initial={{ width: 0 }}
          animate={{ width: `${(strength / 5) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <motion.p
        className="text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={feedback}
      >
        Password strength: {feedback}
      </motion.p>
    </div>
  )
}
