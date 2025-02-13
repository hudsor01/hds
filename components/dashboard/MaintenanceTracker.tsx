'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { useToast } from '@/hooks/use-toast'
import { MaintenanceRequest } from '@/types/maintenance_requests'
import { supabase } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export default function MaintenanceTracker({ propertyId }: { propertyId: string }) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const { toast } = useToast()
  const supabase = supabase(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    // Initial fetch of maintenance requests
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('maintenance_requests')
        .select('*')
        .eq('property_id', propertyId)
        .order('created_at', { ascending: false })

      if (error) {
        toast({
          title: 'Error fetching maintenance requests',
          description: error.message,
          variant: 'destructive'
        })
        return
      }

      setRequests(data || [])
    }

    fetchRequests()

    // Set up real-time subscription
    const channel = supabase
      .channel('maintenance-requests')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'maintenance_requests',
          filter: `property_id=eq.${propertyId}`
        },
        payload => {
          // Handle different types of changes
          if (payload.eventType === 'INSERT') {
            setRequests(prev => [payload.new as MaintenanceRequest, ...prev])
            toast({
              title: 'New maintenance request',
              description: 'A new maintenance request has been created.'
            })
          } else if (payload.eventType === 'UPDATE') {
            setRequests(prev =>
              prev.map(request =>
                request.id === payload.new.id ? (payload.new as MaintenanceRequest) : request
              )
            )
            toast({
              title: 'Maintenance request updated',
              description: `Request status updated to ${payload.new.status}`
            })
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [propertyId, supabase, toast])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.map(request => (
            <div
              key={request.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h3 className="font-medium">{request.title}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge
                variant={
                  request.status === 'completed'
                    ? 'secondary'
                    : request.status === 'in_progress'
                      ? 'outline'
                      : 'default'
                }
              >
                {request.status.replace('_', ' ')}
              </Badge>
            </div>
          ))}
          {requests.length === 0 && (
            <p className="text-center text-gray-500">No maintenance requests found</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
