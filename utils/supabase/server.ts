import {CustomRequest} from '@/types/users';
import {clerkMiddleware} from '@clerk/express';
import {PrismaClient} from '@prisma/client';
import {createClient as createSupabaseClient} from '@supabase/supabase-js';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import 'index.d.ts';

const prisma = new PrismaClient();
const supabase = createSupabaseClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const app = express();

// Essential middleware stack, including Clerk integration
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }),
);

// Custom middleware to load and attach the Clerk user from Prisma
app.use(async (req, res, next) => {
  const userId = (req as CustomRequest).auth?.userId;
  if (userId) {
    (req as CustomRequest).user =
      (await prisma.users.findUnique({
        where: {clerkId: userId},
      })) ?? undefined;
  }
  next();
});

// Security middleware: Helmet and rate limiting
app.use(
  express.json(),
  cors({
    origin: process.env.NEXT_PUBLIC_APP_URL,
  }),
);

// Security middleware: Helmet and rate limiting
app.use(helmet());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

// Database health check endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    // Simple database query to check Prisma connectivity
    await prisma.$queryRaw`SELECT 1`;
    // Call a stored RPC named 'version' against your Supabase database
    const {data, error} = await supabase.rpc('version');
    if (error) throw error;
    res.status(200).json({status: 'healthy', version: data});
  } catch (error) {
    console.error('DB health check error:', error);
    res.status(500).json({status: 'unhealthy'});
  }
});

// Prisma connection management
prisma
  .$connect()
  .then(() => console.log('Prisma connected'))
  .catch(err => console.error('Prisma connection error:', err));

// Supabase auth state listener (if supported in your Node environment)
if (supabase.auth && typeof supabase.auth.onAuthStateChange === 'function') {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session?.user) {
      prisma.users
        .upsert({
          where: {clerkId: session.user.id},
          update: {},
          create: {
            clerkId: session.user.id,
            email: session.user.email!,
          },
        })
        .catch(err => console.error('Error upserting user on auth state change:', err));
    }
  });
} else {
  console.warn('supabase.auth.onAuthStateChange is not supported in this environment.');
}

// Export a factory function to access the Supabase client instance
export const createClient = () => supabase;

export default app;
