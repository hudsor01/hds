import { createClient } from '@/app/utils/supabase/client';

import { useEffect, useState } from 'react';

import { type Session, type User } from '@supabase/supabase-js';

// Hook to get the current session
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, loading };
}

// Hook to get the current user
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}

// Protected route configuration
export const protectedRoutes = ['/dashboard', '/settings', '/properties', '/tenants'];

// Auth redirect configuration
export const authConfig = {
  redirects: {
    signIn: '/login',
    signUp: '/signup',
    forgotPassword: '/forgot-password',
    afterSignIn: '/dashboard',
    afterSignUp: '/dashboard',
  },
};
