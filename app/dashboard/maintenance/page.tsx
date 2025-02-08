'use client';

import { useEffect, useState } from 'react';
import { Plus, AlertTriangle, CheckCircle, Clock } from 'react-feather';
import { Button } from '@/components/ui/buttons/button';
import { Card } from '@/components/ui/cards/card';
import { MaintenanceTicketDialog } from '@/components/dialogs/maintenance-ticket-dialog';
import { MaintenanceTicketDetails } from '@/components/dialogs/maintenance-ticket-details';
import { useToast } from '@/hooks/use-toast';
import { useMaintenanceRequests } from '@/hooks/data';
import type {
  MaintenancePriority,
  MaintenanceStatus,
  MaintenanceRequestWithRelations,
  NewMaintenanceRequest,
  UpdateMaintenanceRequest,
} from '@/types/maintenance_requests';

export default function MaintenancePage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceRequestWithRelations | null>(
    null,
  );
  const { toast } = useToast();
  const { data: response, isLoading, error } = useMaintenanceRequests();
  const tickets = response?.data || [];

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load maintenance tickets',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  const handleCreateTicket = async (data: NewMaintenanceRequest) => {
    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create maintenance ticket');
      }

      toast({
        title: 'Success',
        description: 'Maintenance ticket created successfully',
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create maintenance ticket',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateTicket = async (data: UpdateMaintenanceRequest) => {
    try {
      const response = await fetch(`/api/maintenance/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update maintenance ticket');
      }

      toast({
        title: 'Success',
        description: 'Maintenance ticket updated successfully',
      });
      setSelectedTicket(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update maintenance ticket',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: MaintenanceStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: MaintenancePriority) => {
    switch (priority) {
      case 'low':
        return 'text-gray-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
        return 'text-orange-500';
      case 'urgent':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-sm text-gray-500">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Maintenance Tickets</h1>
          <p className="text-gray-500">Manage and track maintenance requests</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket: MaintenanceRequestWithRelations) => (
          <Card key={ticket.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(ticket.status)}
                  <h3 className="font-medium">{ticket.title}</h3>
                  <span
                    className={`text-sm ${getPriorityColor(ticket.priority)}`}
                  >
                    {ticket.priority.charAt(0).toUpperCase() +
                      ticket.priority.slice(1)}{' '}
                    Priority
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {ticket.property?.name} - Unit {ticket.unit?.number}
                </p>
                <p className="text-sm">{ticket.description}</p>
              </div>
              <Button
                variant="outline"
                className="px-3 py-1 text-sm"
                onClick={() => setSelectedTicket(ticket)}
              >
                View Details
              </Button>
            </div>
          </Card>
        ))}
        {tickets.length === 0 && (
          <div className="text-center">
            <p className="text-gray-500">No maintenance tickets found</p>
          </div>
        )}
      </div>

      <MaintenanceTicketDialog
        open={isCreateDialogOpen}
        onOpenChangeAction={setIsCreateDialogOpen}
        onSubmitAction={handleCreateTicket}
      />

      {selectedTicket && (
        <MaintenanceTicketDetails
          open={Boolean(selectedTicket)}
          onOpenChangeAction={() => setSelectedTicket(null)}
          ticket={selectedTicket}
          onUpdateAction={handleUpdateTicket}
        />
      )}
    </div>
  );
}
