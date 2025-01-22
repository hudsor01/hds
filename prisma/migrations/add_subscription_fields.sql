-- Add subscription fields to auth.users table
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS "stripeSubscriptionId" TEXT,
ADD COLUMN IF NOT EXISTS "subscriptionStatus" TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS "trialEndsAt" TIMESTAMPTZ;
