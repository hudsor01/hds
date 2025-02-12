import { supabase } from '@/lib/supabase'
import type { UseDashboardUpdatesProps } from '@/types/db.types'
import { useCallback, useEffect } from 'react'

export function useDashboardUpdates({
  table,
  select = '*',
  onUpdate,
  onDelete
}: UseDashboardUpdatesProps) {
  const handleUpdates = useCallback(() => {
    const channel = supabase
      .channel(`${table}_changes`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table
        },
        payload => {
          const data = payload.new
          onUpdate(data)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table
        },
        payload => {
          const id = payload.old.id
          onDelete(id)
        }
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [table, onUpdate, onDelete])

  useEffect(() => {
    return handleUpdates()
  }, [handleUpdates])
}
