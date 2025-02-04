'use client';

import {ClerkProvider} from '@clerk/nextjs';
import type {ReactNode} from 'react';

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
