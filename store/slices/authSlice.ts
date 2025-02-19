import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, Session } from '@supabase/supabase-js';
import type { AuthState, ThunkConfig } from '../types';
import { createClient } from '@/utils/supabase/client';

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  error: null,
};

// Async thunks
export const initializeAuth = createAsyncThunk<
  { user: User | null; session: Session | null },
  void,
  ThunkConfig
>('auth/initialize', async (_, { rejectWithValue }) => {
  try {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) throw error;
    
    return {
      user: session?.user ?? null,
      session: session,
    };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to initialize auth');
  }
});

export const signIn = createAsyncThunk<
  { user: User; session: Session },
  { email: string; password: string },
  ThunkConfig
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
  try {
    const supabase = createClient();
    const { data: { user, session }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    if (!user || !session) throw new Error('Authentication failed');

    return { user, session };
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to sign in');
  }
});

export const signInWithGoogle = createAsyncThunk<void, void, ThunkConfig>(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sign in with Google');
    }
  }
);

export const signOut = createAsyncThunk<void, void, ThunkConfig>(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sign out');
    }
  }
);

export const verifyEmail = createAsyncThunk<void, { token: string; email: string }, ThunkConfig>(
  'auth/verifyEmail',
  async ({ token, email }, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        token,
        type: 'email',
        email,
      });

      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to verify email');
    }
  }
);

export const resetPassword = createAsyncThunk<void, { email: string }, ThunkConfig>(
  'auth/resetPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to send reset password email');
    }
  }
);

export const updatePassword = createAsyncThunk<void, { password: string }, ThunkConfig>(
  'auth/updatePassword',
  async ({ password }, { rejectWithValue }) => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update password');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      state.session = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Initialize Auth
    builder.addCase(initializeAuth.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(initializeAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.session = action.payload.session;
    });
    builder.addCase(initializeAuth.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Failed to initialize auth';
    });

    // Sign In
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.session = action.payload.session;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Failed to sign in';
    });

    // Sign Out
    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.session = null;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? 'Failed to sign out';
    });

    // For other auth actions, we mainly care about error states
    [signInWithGoogle, verifyEmail, resetPassword, updatePassword].forEach(thunk => {
      builder.addCase(thunk.pending, (state) => {
        state.error = null;
      });
      builder.addCase(thunk.rejected, (state, action) => {
        state.error = action.payload ?? `Failed to complete ${thunk.typePrefix}`;
      });
    });
  },
});

export const { setUser, setSession, setError, resetAuth } = authSlice.actions;

export default authSlice.reducer;