CREATE TABLE IF NOT EXISTS public.sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  session_token text NOT NULL UNIQUE,
  expires timestamptz NOT NULL,
  last_active timestamptz NOT NULL DEFAULT now(),
  is_revoked boolean NOT NULL DEFAULT false,
  device text,
  browser text,
  operating_system text,
  ip_address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
