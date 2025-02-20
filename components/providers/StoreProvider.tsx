'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@/store'
import { LoadingOverlay } from '@/components/shared/LoadingOverlay'

export function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const isClient = useRef(typeof window !== 'undefined').current

    if (!isClient) {
        return <>{children}</>
    }

    return (
        <Provider store={store}>
            <PersistGate
                loading={<LoadingOverlay />}
                persistor={persistor}
            >
                {children}
            </PersistGate>
        </Provider>
    )
}
