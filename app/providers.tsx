'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/lib/store'

export default function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <ReduxProvider store={store}>
            <NextThemesProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
            >
                {children}
            </NextThemesProvider>
        </ReduxProvider>
    )
}
