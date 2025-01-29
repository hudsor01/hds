-- Add NextAuth specific fields to auth.users table
ALTER TABLE auth.users
ADD COLUMN IF NOT EXISTS provider TEXT,
ADD COLUMN IF NOT EXISTS provider_account_id TEXT,
ADD COLUMN IF NOT EXISTS access_token TEXT,
ADD COLUMN IF NOT EXISTS refresh_token TEXT,
ADD COLUMN IF NOT EXISTS expires_at INTEGER;

-- Create unique constraint for provider authentication
ALTER TABLE auth.users
ADD CONSTRAINT users_provider_account_unique UNIQUE (provider, provider_account_id);

-- Create sessions table for NextAuth if not exists
CREATE TABLE IF NOT EXISTS auth.sessions (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    session_token TEXT NOT NULL UNIQUE,
    access_token TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create verification tokens table for email verification
CREATE TABLE IF NOT EXISTS auth.verification_tokens (
    identifier TEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (identifier, token)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON auth.sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_session_token_idx ON auth.sessions(session_token);
