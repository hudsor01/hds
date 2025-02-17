'use client'

import { useState, useEffect } from 'react'
import { RealtimeChannel } from '@supabase/supabase-js'
import { supabase } from './client'
import type { Database } from '@/types/db.types'

type TableName = keyof Database['public']['Tables']
type Row<T extends TableName> = Database['public']['Tables'][T]['Row']
type InsertPayload<T extends TableName> = Database['public']['Tables'][T]['Insert']
type UpdatePayload<T extends TableName> = Database['public']['Tables'][T]['Update']

interface UseSupabaseDataOptions<T extends TableName> {
  realtime?: boolean
  select?: string
  filter?: {
    column: keyof Row<T>
    value: any
  }[]
  orderBy?: {
    column: keyof Row<T>
    ascending?: boolean
  }
  limit?: number
}

function useSupabaseData<T extends TableName>(tableName: T, options: UseSupabaseDataOptions<T> = {}) {
  const [data, setData] = useState<Row<T>[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<RealtimeChannel | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchData() {
      try {
        let query = supabase.from(tableName).select(options.select || '*')

        // Apply filters
        if (options.filter) {
          options.filter.forEach(({ column, value }) => {
            query = query.eq(column as string, value)
          })
        }

        // Apply ordering
        if (options.orderBy) {
          query = query.order(options.orderBy.column as string, { ascending: options.orderBy.ascending })
        }

        // Apply limit
        if (options.limit) {
          query = query.limit(options.limit)
        }

        const { data: result, error } = await query

        if (error) throw error

        if (isMounted) {
          setData(result)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An error occurred'))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    // Set up real-time subscription if enabled
    if (options.realtime) {
      const channel = supabase
        .channel(`${tableName}_changes`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: tableName
          },
          async payload => {
            // Refetch data to ensure consistency
            await fetchData()
          }
        )
        .subscribe()

      setSubscription(channel)
    }

    return () => {
      isMounted = false
      if (subscription) {
        supabase.removeChannel(subscription)
      }
    }
  }, [tableName, JSON.stringify(options)])

  // Mutation functions
  const insert = async (payload: InsertPayload<T>) => {
    try {
      const { data: result, error } = await supabase.from(tableName).insert(payload).select()

      if (error) throw error

      return result
    } catch (err) {
      throw err instanceof Error ? err : new Error('Insert failed')
    }
  }

  const update = async (id: number | string, payload: UpdatePayload<T>) => {
    try {
      const { data: result, error } = await supabase.from(tableName).update(payload).eq('id', id).select()

      if (error) throw error

      return result
    } catch (err) {
      throw err instanceof Error ? err : new Error('Update failed')
    }
  }

  const remove = async (id: number | string) => {
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id)

      if (error) throw error

      return true
    } catch (err) {
      throw err instanceof Error ? err : new Error('Delete failed')
    }
  }

  return {
    data,
    error,
    loading,
    insert,
    update,
    remove,
    refresh: () => {
      setLoading(true)
    }
  }
}

export default useSupabaseData
