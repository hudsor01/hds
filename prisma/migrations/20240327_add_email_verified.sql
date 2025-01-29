-- Add emailVerified column to auth.users table
ALTER TABLE auth.users
ADD COLUMN email_verified TIMESTAMP;

-- Add index on email_verified column for better query performance
CREATE INDEX idx_users_email_verified ON auth.users(email_verified);
