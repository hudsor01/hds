'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles'

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthProps): React.ReactElement {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState('')
  const theme = useTheme()

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
    const feedbackMessages = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']
    setFeedback(feedbackMessages[newStrength] || 'Very weak')
  }, [password])

  const strengthColor = [
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.info.main,
    theme.palette.primary.main,
    theme.palette.success.main,
    theme.palette.success.dark
  ][strength]

  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className={`h-full`}
          style={{ backgroundColor: strengthColor }}
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
