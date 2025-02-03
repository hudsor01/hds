// backend/index.ts
import { clerkClient } from '@clerk/nextjs/server'
import express, { NextFunction, Request, Response } from 'express'

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
app.get('/api/admin', requireAuth, async (req, res): Promise<void> => {
  if (!req.auth.userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const clerk = await clerkClient();
  const user = await clerk.users.getUser(req.auth.userId);

  if (user.publicMetadata.role !== 'admin') {
    res.status(403).json({ error: 'Not authorized' });
    return;
  }

  res.json({ message: 'Admin route' });
})

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.auth || !req.auth.userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  next();
}
