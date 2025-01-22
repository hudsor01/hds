-- Add subscription fields to auth.users table
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive',
ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ;

-- Enable RLS (if not already enabled)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON auth.users;
DROP POLICY IF EXISTS "Users can update their own data" ON auth.users;

-- Create new policies
CREATE POLICY "Users can view their own data" ON auth.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON auth.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);
