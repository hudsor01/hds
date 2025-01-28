-- Enable RLS on all user-related tables
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Accounts table policies
CREATE POLICY "Users can view their own accounts" ON public.accounts
    FOR SELECT
    TO authenticated
    USING (user_id::uuid = auth.uid());

CREATE POLICY "Users can manage their own accounts" ON public.accounts
    FOR ALL
    TO authenticated
    USING (user_id::uuid = auth.uid())
    WITH CHECK (user_id::uuid = auth.uid());

-- Sessions table policies
CREATE POLICY "Users can view their own sessions" ON public.sessions
    FOR SELECT
    TO authenticated
    USING (user_id::uuid = auth.uid());

CREATE POLICY "Users can manage their own sessions" ON public.sessions
    FOR ALL
    TO authenticated
    USING (user_id::uuid = auth.uid())
    WITH CHECK (user_id::uuid = auth.uid());

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS accounts_user_provider_idx ON public.accounts(user_id, provider);
CREATE INDEX IF NOT EXISTS sessions_user_token_idx ON public.sessions(user_id, session_token);

-- Ensure referential integrity
ALTER TABLE public.accounts
    DROP CONSTRAINT IF EXISTS accounts_user_id_fkey,
    ADD CONSTRAINT accounts_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE;

ALTER TABLE public.sessions
    DROP CONSTRAINT IF EXISTS sessions_user_id_fkey,
    ADD CONSTRAINT sessions_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES public.users(id)
    ON DELETE CASCADE;
