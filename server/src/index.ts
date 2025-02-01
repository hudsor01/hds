import { createClerkClient } from '@clerk/backend'
import { clerkMiddleware } from '@clerk/express'
import { createClient } from '@supabase/supabase-js'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'
import express, { NextFunction, Request, Response } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import { handleClerkWebhook } from './middleware/clerk-webhook'

// Load environment variables
dotenv.config()

// Initialize Clerk
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

// Initialize Express app
const app = express()
const port = process.env.PORT || 5000

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

// Middleware
app.use(express.json())
app.use(cors({
  origin: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'svix-id', 'svix-timestamp', 'svix-signature']
}))
app.use(helmet()) // Security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use(limiter)

// Initialize Clerk middleware
const auth = clerkMiddleware()

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' })
})

// Webhook endpoint (must be before auth middleware)
app.post('/api/webhooks/clerk', handleClerkWebhook)

// Protected routes
app.use('/api', auth)

// Properties routes
app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', req.auth.userId)

    if (error) throw error
    res.json(data)
  } catch (error) {
    console.error('Error fetching properties:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.post('/api/properties', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([{ ...req.body, owner_id: req.auth.userId }])
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    console.error('Error creating property:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Waitlist routes (public)
app.post('/api/waitlist', async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email, status: 'pending' }])

    if (error) throw error
    res.status(201).json({ message: 'Successfully joined waitlist' })
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// User profile routes
app.post('/api/user-profiles', async (req: Request, res: Response) => {
  const userId = req.auth.userId
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    // Get additional user data from Clerk
    const user = await clerk.users.getUser(userId)

    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{
        user_id: userId,
        email: user.emailAddresses[0]?.emailAddress,
        ...req.body
      }])
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    console.error('Error creating user profile:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something broke!' })
})

// Start server
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`)
})
