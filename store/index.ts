import {
    configureStore,
    type ThunkAction,
    type Action
} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'
import type { RootState } from './types'
import process from 'process'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'ui'] // Only persist these reducers
}

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }),
    devTools: process.env.NODE_ENV !== 'production'
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

// Export type-safe hooks
export * from './hooks'
