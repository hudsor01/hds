// backend/index.ts
import { clerkClient } from '@clerk/nextjs/server'
import express from 'express'
import { requireAuth } from './middleware/auth'

const app = express()

// Public routes
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public route' })
})

// Protected routes
app.get('/api/protected', requireAuth, (req, res) => {
  const userId = req.auth.userId
  res.json({ message: `Protected route for user ${userId}` })
})

// Role-based routes
app.get('/api/admin', requireAuth, async (req, res) => {
  const user = await clerkClient.users.getUser(req.auth.userId)

  if (!user.publicMetadata.role === 'admin') {
    return res.status(403).json({ error: 'Not authorized' })
  }

  res.json({ message: 'Admin route' })
})
