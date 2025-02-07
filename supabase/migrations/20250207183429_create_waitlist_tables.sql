-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    status TEXT DEFAULT 'pending',
    position INTEGER,
    referral_code TEXT UNIQUE,
    referred_by TEXT REFERENCES waitlist(email),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create waitlist_events table for analytics
CREATE TABLE IF NOT EXISTS waitlist_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    waitlist_id UUID REFERENCES waitlist(id),
    event_type TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);
CREATE INDEX IF NOT EXISTS waitlist_status_idx ON waitlist(status);
CREATE INDEX IF NOT EXISTS waitlist_position_idx ON waitlist(position);
CREATE INDEX IF NOT EXISTS waitlist_referral_code_idx ON waitlist(referral_code);
CREATE INDEX IF NOT EXISTS waitlist_events_type_idx ON waitlist_events(event_type);
CREATE INDEX IF NOT EXISTS waitlist_events_created_idx ON waitlist_events(created_at);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist_events ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies

-- Waitlist policies
CREATE POLICY "Enable read access for all users"
    ON waitlist FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for unauthenticated users"
    ON waitlist FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Enable update for admins only"
    ON waitlist FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'ADMIN'
        )
    );

-- Waitlist events policies
CREATE POLICY "Enable insert for authenticated users"
    ON waitlist_events FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read for admins only"
    ON waitlist_events FOR SELECT
    USING (
        auth.role() = 'authenticated' AND
        EXISTS (
            SELECT 1 FROM users
            WHERE users.id = auth.uid()
            AND users.role = 'ADMIN'
        )
    );

-- Create function to update waitlist positions
CREATE OR REPLACE FUNCTION update_waitlist_positions()
RETURNS TRIGGER AS $$
BEGIN
    -- Update positions for all users after the inserted/updated record
    UPDATE waitlist
    SET position = subquery.new_position
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY created_at ASC) AS new_position
        FROM waitlist
        WHERE status = 'pending'
    ) AS subquery
    WHERE waitlist.id = subquery.id
    AND waitlist.position IS DISTINCT FROM subquery.new_position;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to maintain waitlist positions
CREATE TRIGGER update_waitlist_positions_on_insert
    AFTER INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_waitlist_positions();

CREATE TRIGGER update_waitlist_positions_on_update
    AFTER UPDATE OF status ON waitlist
    FOR EACH ROW
    WHEN (OLD.status IS DISTINCT FROM NEW.status)
    EXECUTE FUNCTION update_waitlist_positions();

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.referral_code IS NULL THEN
        NEW.referral_code = UPPER(SUBSTRING(MD5(NEW.id::text || NOW()::text) FROM 1 FOR 8));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for referral code generation
CREATE TRIGGER generate_referral_code_on_insert
    BEFORE INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION generate_referral_code();

-- Create function to log waitlist events
CREATE OR REPLACE FUNCTION log_waitlist_event(
    p_waitlist_id UUID,
    p_event_type TEXT,
    p_metadata JSONB DEFAULT '{}'::jsonb
) RETURNS UUID AS $$
DECLARE
    v_event_id UUID;
BEGIN
    INSERT INTO waitlist_events (waitlist_id, event_type, metadata)
    VALUES (p_waitlist_id, p_event_type, p_metadata)
    RETURNING id INTO v_event_id;

    RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
