import { type User, type Session } from '@supabase/supabase-js';

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  globalLoading: boolean;
  pageLoading: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  dismissed?: boolean;
  createdAt: number;
}

// Add property types once we have the schema
export interface PropertyState {
  properties: any[];
  selectedProperty: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface TenantState {
  tenants: any[];
  selectedTenant: any | null;
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  ui: UIState;
  property: PropertyState;
  tenant: TenantState;
}

// Action status type for loading states
export type ActionStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

// Generic async thunk types
export interface ThunkConfig {
  state: RootState;
  rejectValue: string;
}