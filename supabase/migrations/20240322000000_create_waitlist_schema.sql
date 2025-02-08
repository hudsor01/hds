-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    name TEXT,
    position INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    referral_code TEXT UNIQUE,
    referred_by CITEXT REFERENCES waitlist(email),
    email_verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP WITH TIME ZONE,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create waitlist events table
CREATE TABLE IF NOT EXISTS public.waitlist_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT NOT NULL REFERENCES waitlist(email),
    type TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create verification tokens table
CREATE TABLE IF NOT EXISTS public.verification_tokens (
    identifier CITEXT NOT NULL,
    token TEXT NOT NULL,
    expires TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    PRIMARY KEY (identifier, token)
);

-- Create IP blacklist table
CREATE TABLE IF NOT EXISTS public.ip_blacklist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address INET UNIQUE NOT NULL,
    reason TEXT,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    created_by UUID REFERENCES auth.users(id)
);

-- Create waitlist attempts tracking
CREATE TABLE IF NOT EXISTS public.waitlist_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    identifier TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS waitlist_position_idx ON public.waitlist(position);
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON public.waitlist(status);
CREATE INDEX IF NOT EXISTS waitlist_referral_code_idx ON public.waitlist(referral_code);
CREATE INDEX IF NOT EXISTS waitlist_referred_by_idx ON public.waitlist(referred_by);
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON public.waitlist(created_at);

CREATE INDEX IF NOT EXISTS waitlist_events_email_idx ON public.waitlist_events(email);
CREATE INDEX IF NOT EXISTS waitlist_events_type_idx ON public.waitlist_events(type);
CREATE INDEX IF NOT EXISTS waitlist_events_timestamp_idx ON public.waitlist_events(timestamp);

CREATE INDEX IF NOT EXISTS verification_tokens_expires_idx ON public.verification_tokens(expires);
CREATE INDEX IF NOT EXISTS ip_blacklist_expires_idx ON public.ip_blacklist(expires_at);
CREATE INDEX IF NOT EXISTS waitlist_attempts_identifier_idx ON public.waitlist_attempts(identifier);
CREATE INDEX IF NOT EXISTS waitlist_attempts_created_at_idx ON public.waitlist_attempts(created_at);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ip_blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_attempts ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Waitlist policies
CREATE POLICY "Enable public read access for waitlist" ON public.waitlist
    FOR SELECT USING (true);

CREATE POLICY "Enable self-service signup" ON public.waitlist
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable users to update their own entries" ON public.waitlist
    FOR UPDATE USING (
        auth.uid() IS NOT NULL AND current_setting('jwt.claims.email', true) = waitlist.email
    );

CREATE POLICY "Enable admin access to waitlist" ON public.waitlist
    FOR ALL USING (
        auth.uid() IS NOT NULL AND current_setting('jwt.claims.role', true) = 'ADMIN'
    );

-- Waitlist events policies
CREATE POLICY "Enable read access for own events" ON public.waitlist_events
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND current_setting('jwt.claims.email', true) = waitlist_events.email
    );

CREATE POLICY "Enable admin access to events" ON public.waitlist_events
    FOR ALL USING (
        auth.uid() IS NOT NULL AND current_setting('jwt.claims.role', true) = 'ADMIN'
    );

-- Verification tokens policies
CREATE POLICY "Enable access to own verification tokens" ON public.verification_tokens
    FOR ALL USING (
        auth.uid() IS NOT NULL AND current_setting('jwt.claims.email', true) = verification_tokens.identifier
    );

-- IP blacklist policies
CREATE POLICY "Enable admin access to IP blacklist" ON public.ip_blacklist
    FOR ALL USING (
        auth.uid() IS NOT NULL AND current_setting('jwt.claims.role', true) = 'ADMIN'
    );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create function to get top referrers
CREATE OR REPLACE FUNCTION public.get_top_referrers(limit_count INTEGER)
RETURNS TABLE (
    email TEXT,
    referral_count BIGINT,
    positions_gained INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        w.email,
        COUNT(DISTINCT r.email) as referral_count,
        COALESCE(SUM(
            (we.metadata->>'position_change')::INTEGER
        ), 0) as positions_gained
    FROM public.waitlist w
    LEFT JOIN public.waitlist r ON r.referred_by = w.email
    LEFT JOIN public.waitlist_events we ON we.email = w.email
        AND we.type = 'referral_bonus'
    GROUP BY w.email
    ORDER BY referral_count DESC, positions_gained DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
