import { clerkMiddleware } from '@clerk/express'
import { PrismaClient } from '@prisma/client'
import { createServerClient } from '@supabase/ssr'
import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

const prisma = new PrismaClient();
const supabase = createServerClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const app = express();

// Essential middleware stack
app.use(
  clerkMiddleware({
    // Required for API routes
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
    // Connect Clerk user ID to Prisma
    async onUserLoaded(req) {
      const userId = req.auth.userId;
      if (userId) {
        req.user = await prisma.user.findUnique({
          where: { clerkId: userId }
        });
      }
    }
  }),
  express.json(),
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL
  })
);

// Security middleware
app.use(
  helmet(),
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per window
  })
);

// Database health check endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    await supabase.rpc('version');
    res.status(200).json({ status: 'healthy' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy' });
  }
});

// Prisma connection management
prisma.$connect()
  .then(() => console.log('Prisma connected'))
  .catch((err) => console.error('Prisma connection error:', err));

// Supabase auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  // Sync with Prisma user records
  if (event === 'SIGNED_IN' && session?.user) {
    prisma.user.upsert({
      where: { clerkId: session.user.id },
      update: {},
      create: {
        clerkId: session.user.id,
        email: session.user.email!
      }
    });
  }
});

// ... rest of endpoints ...
