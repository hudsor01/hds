-- Make email and encrypted_password non-nullable in auth.users table
ALTER TABLE auth.users
ALTER COLUMN email SET NOT NULL,
ALTER COLUMN encrypted_password SET NOT NULL;

-- Add NOT NULL constraints to ensure data integrity
ALTER TABLE auth.users
ADD CONSTRAINT users_email_not_null_auth CHECK (email IS NOT NULL),
ADD CONSTRAINT users_password_not_null_auth CHECK (encrypted_password IS NOT NULL);

-- Create index for email lookups if not exists
CREATE INDEX IF NOT EXISTS users_email_idx_auth ON auth.users(email);
