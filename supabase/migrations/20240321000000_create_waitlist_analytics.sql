-- Create waitlist events table
CREATE TABLE IF NOT EXISTS waitlist_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL REFERENCES waitlist(email),
  type TEXT NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index on email and type for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_events_email_idx ON waitlist_events(email);
CREATE INDEX IF NOT EXISTS waitlist_events_type_idx ON waitlist_events(type);
CREATE INDEX IF NOT EXISTS waitlist_events_timestamp_idx ON waitlist_events(timestamp);

-- Create materialized view for daily stats
CREATE MATERIALIZED VIEW IF NOT EXISTS waitlist_daily_stats AS
SELECT
  DATE_TRUNC('day', timestamp) AS date,
  COUNT(*) FILTER (WHERE type = 'signup') AS signups,
  COUNT(*) FILTER (WHERE type = 'referral_created') AS referrals,
  COUNT(*) FILTER (WHERE type = 'email_opened') AS email_opens,
  COUNT(*) FILTER (WHERE type = 'link_clicked') AS link_clicks
FROM waitlist_events
GROUP BY DATE_TRUNC('day', timestamp)
ORDER BY date DESC;

-- Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_waitlist_stats()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY waitlist_daily_stats;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh stats on event insert
CREATE TRIGGER refresh_waitlist_stats_trigger
AFTER INSERT ON waitlist_events
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_waitlist_stats();

-- Create RLS policies
ALTER TABLE waitlist_events ENABLE ROW LEVEL SECURITY;

-- Allow insert for authenticated users
CREATE POLICY "Allow authenticated users to insert events"
  ON waitlist_events FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Allow users to view their own events
CREATE POLICY "Allow users to view their own events"
  ON waitlist_events FOR SELECT
  USING (email IN (
    SELECT email FROM waitlist WHERE email = current_user
  ));

-- Allow admins to view all events
CREATE POLICY "Allow admins to view all events"
  ON waitlist_events FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
      AND users.role = 'ADMIN'
  ));
