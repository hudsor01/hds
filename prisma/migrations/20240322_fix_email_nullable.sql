-- Make email non-nullable in auth.users table
ALTER TABLE auth.users
ALTER COLUMN email SET NOT NULL;

-- Make email non-nullable in public.users table
ALTER TABLE public.users
ALTER COLUMN email SET NOT NULL;

-- Add NOT NULL constraint to ensure data integrity
ALTER TABLE auth.users
ADD CONSTRAINT users_email_not_null CHECK (email IS NOT NULL);

ALTER TABLE public.users
ADD CONSTRAINT users_email_not_null CHECK (email IS NOT NULL);

-- Add RLS policies for users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can view and update their own data
CREATE POLICY "Users can view their own data" ON public.users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users" ON public.users
    FOR SELECT
    TO authenticated
    USING (auth.role() = 'ADMIN');

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON public.users(email);
