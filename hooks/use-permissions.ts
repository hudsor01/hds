import supabase from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useAuth } from './use-auth'

export function usePermissions() {
  const { user } = usesupabase.auth()
  const [permissions, setPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = supabase()

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!user) {
        setPermissions([])
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('user_permissions')
          .select('permissions')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching permissions:', error)
          setPermissions([])
        } else {
          setPermissions(data.permissions || [])
        }
      } catch (error) {
        console.error('Error fetching permissions:', error)
        setPermissions([])
      } finally {
        setLoading(false)
      }
    }

    fetchPermissions()
  }, [user])

  return { permissions, loading }
}
