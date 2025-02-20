import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User, Session, Provider } from '@supabase/supabase-js'
import type { AuthState, ThunkConfig } from '../types'
import { createClient } from '@/utils/supabase/client'

const initialState: AuthState = {
    user: null,
    session: null,
    isLoading: false,
    error: null
}

// Initialize auth state
export const initializeAuth = createAsyncThunk<
    { user: User | null; session: Session | null },
    void,
    ThunkConfig
>('auth/initialize', async (_, { rejectWithValue }) => {
    try {
        const supabase = createClient()
        const {
            data: { session },
            error
        } = await supabase.auth.getSession()

        if (error) throw error

        return {
            user: session?.user ?? null,
            session: session
        }
    } catch (error) {
        return rejectWithValue(
            error instanceof Error
                ? error.message
                : 'Failed to initialize auth'
        )
    }
})

// Sign up with email
export const signUp = createAsyncThunk<
    void,
    {
        email: string
        password: string
        options?: {
            data?: Record<string, any>
            emailRedirectTo?: string
        }
    },
    ThunkConfig
>(
    'auth/signUp',
    async ({ email, password, options }, { rejectWithValue }) => {
        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                    data: options?.data
                }
            })

            if (error) throw error
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to sign up'
            )
        }
    }
)

// Sign in with email
export const signIn = createAsyncThunk<
    { user: User; session: Session },
    { email: string; password: string },
    ThunkConfig
>('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
    try {
        const supabase = createClient()
        const {
            data: { user, session },
            error
        } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error
        if (!user || !session)
            throw new Error('Authentication failed')

        return { user, session }
    } catch (error) {
        return rejectWithValue(
            error instanceof Error
                ? error.message
                : 'Failed to sign in'
        )
    }
})

// Sign in with social provider
export const signInWithProvider = createAsyncThunk<
    void,
    { provider: Provider },
    ThunkConfig
>(
    'auth/signInWithProvider',
    async ({ provider }, { rejectWithValue }) => {
        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
                }
            })

            if (error) throw error
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to sign in with provider'
            )
        }
    }
)

// Sign in with Google shorthand
export const signInWithGoogle = createAsyncThunk<
    void,
    void,
    ThunkConfig
>('auth/signInWithGoogle', async (_, { dispatch }) => {
    return dispatch(signInWithProvider({ provider: 'google' }))
})

// Sign out
export const signOut = createAsyncThunk<void, void, ThunkConfig>(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to sign out'
            )
        }
    }
)

// Reset password
export const resetPassword = createAsyncThunk<
    void,
    { email: string },
    ThunkConfig
>('auth/resetPassword', async ({ email }, { rejectWithValue }) => {
    try {
        const supabase = createClient()
        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: `${window.location.origin}/auth/reset-password`
            }
        )

        if (error) throw error
    } catch (error) {
        return rejectWithValue(
            error instanceof Error
                ? error.message
                : 'Failed to send reset password email'
        )
    }
})

// Update password
export const updatePassword = createAsyncThunk<
    void,
    { password: string },
    ThunkConfig
>(
    'auth/updatePassword',
    async ({ password }, { rejectWithValue }) => {
        try {
            const supabase = createClient()
            const { error } = await supabase.auth.updateUser({
                password
            })

            if (error) throw error
        } catch (error) {
            return rejectWithValue(
                error instanceof Error
                    ? error.message
                    : 'Failed to update password'
            )
        }
    }
)

// Refresh session
export const refreshSession = createAsyncThunk<
    { user: User; session: Session },
    void,
    ThunkConfig
>('auth/refreshSession', async (_, { rejectWithValue }) => {
    try {
        const supabase = createClient()
        const {
            data: { user, session },
            error
        } = await supabase.auth.refreshSession()

        if (error) throw error
        if (!user || !session)
            throw new Error('Session refresh failed')

        return { user, session }
    } catch (error) {
        return rejectWithValue(
            error instanceof Error
                ? error.message
                : 'Failed to refresh session'
        )
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        setSession: (
            state,
            action: PayloadAction<Session | null>
        ) => {
            state.session = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        resetAuth: state => {
            state.user = null
            state.session = null
            state.error = null
            state.isLoading = false
        }
    },
    extraReducers: builder => {
        // Generic loading and error handling
        builder.addMatcher(
            action => action.type.endsWith('/pending'),
            state => {
                state.isLoading = true
                state.error = null
            }
        )
        builder.addMatcher(
            action => action.type.endsWith('/rejected'),
            (state, action) => {
                state.isLoading = false
                state.error = action.payload ?? 'An error occurred'
            }
        )
        builder.addMatcher(
            action => action.type.endsWith('/fulfilled'),
            state => {
                state.isLoading = false
                state.error = null
            }
        )

        // Specific handlers
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.session = action.payload.session
        })

        builder.addCase(signOut.fulfilled, state => {
            state.user = null
            state.session = null
        })

        builder.addCase(refreshSession.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.session = action.payload.session
        })

        builder.addCase(initializeAuth.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.session = action.payload.session
        })
    }
})

export const { setUser, setSession, setError, resetAuth } =
    authSlice.actions

export default authSlice.reducer
