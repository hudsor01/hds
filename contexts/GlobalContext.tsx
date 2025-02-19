'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Session, type User } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { LinearProgress } from '@mui/material';

interface GlobalContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  session: null,
  user: null,
  isLoading: true,
  globalLoading: false,
  setGlobalLoading: () => {},
});

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session: activeSession } } = await supabase.auth.getSession();
        setSession(activeSession);
        setUser(activeSession?.user ?? null);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <GlobalContext.Provider 
      value={{ 
        session, 
        user, 
        isLoading,
        globalLoading,
        setGlobalLoading
      }}
    >
      {globalLoading && (
        <LinearProgress
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        />
      )}
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobal = () => useContext(GlobalContext);