'use client'

import { useState, useCallback } from 'react'
import { useGlobal } from '@/contexts/GlobalContext'

export function useLoading(initialState = false) {
    const [localLoading, setLocalLoading] = useState(initialState)
    const { setGlobalLoading } = useGlobal()

    const withLoading = useCallback(
        async <T>(
            fn: () => Promise<T>,
            options: {
                showGlobal?: boolean
                throwError?: boolean
            } = {}
        ): Promise<T> => {
            const { showGlobal = false, throwError = true } = options

            try {
                setLocalLoading(true)
                if (showGlobal) setGlobalLoading(true)

                const result = await fn()
                return result
            } catch (error) {
                if (throwError) throw error
                console.error('Error in withLoading:', error)
                throw error
            } finally {
                setLocalLoading(false)
                if (showGlobal) setGlobalLoading(false)
            }
        },
        [setGlobalLoading]
    )

    return {
        loading: localLoading,
        withLoading
    }
}
