import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    id: string
    email: string
}

interface AuthState {
    user: User | null
    isLoading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
            state.isLoading = false
            state.error = null
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

export const { setUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer
