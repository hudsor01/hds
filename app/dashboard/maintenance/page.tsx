'use client';

import {Button} from '@/components/ui/buttons/button';
import {MaintenanceTicketDetails} from 'components/dialogs/maintenance-ticket-details';
import {MaintenanceTicketDialog} from 'components/dialogs/maintenance-ticket-dialog';
import {Card} from 'components/ui/card';
import {useState} from 'react';
import {AlertTriangle, CheckCircle, Clock, Plus} from 'react-feather';
import {
  MaintenancePriority,
  MaintenanceStatus,
  MaintenanceTicket,
  NewMaintenanceTicket,
  UpdateMaintenanceTicket,
} from 'types/maintenance';

// Mock data for development
const MOCK_TICKETS: MaintenanceTicket[] = [
  {
    id: '1',
    title: 'Broken AC Unit',
    description: 'AC unit in apartment 2B is not cooling properly',
    status: 'open',
    priority: 'high',
    propertyId: 'prop1',
    propertyName: 'Sunset Apartments',
    unitId: 'unit1',
    unitNumber: '2B',
    createdBy: 'tenant@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: '2',
    title: 'Leaking Faucet',
    description: 'Kitchen sink faucet is dripping constantly',
    status: 'in_progress',
    priority: 'medium',
    propertyId: 'prop1',
    propertyName: 'Sunset Apartments',
    unitId: 'unit2',
    unitNumber: '3A',
    createdBy: 'tenant@example.com',
    assignedTo: 'maintenance@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    comments: [],
  },
];

export default function MaintenancePage() {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(MOCK_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateTicket = async (data: NewMaintenanceTicket) => {
    // TODO: Implement API call
    const newTicket: MaintenanceTicket = {
      ...data,
      id: (tickets.length + 1).toString(),
      status: 'open',
      propertyName: 'Sunset Apartments', // This would come from the API
      createdBy: 'user@example.com', // This would come from the session
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    };
    setTickets([...tickets, newTicket]);
  };

  const handleUpdateTicket = async (data: UpdateMaintenanceTicket) => {
    // TODO: Implement API call
    const updatedTickets = tickets.map(ticket =>
      ticket.id === data.id ? {...ticket, ...data, updatedAt: new Date().toISOString()} : ticket,
    );
    setTickets(updatedTickets);
  };

  const getPriorityColor = (priority: MaintenancePriority) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-500';
      case 'high':
        return 'text-orange-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: MaintenanceStatus) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className='h-5 w-5 text-yellow-500' />;
      case 'in_progress':
        return <Clock className='h-5 w-5 text-blue-500' />;
      case 'completed':
        return <CheckCircle className='h-5 w-5 text-green-500' />;
      case 'cancelled':
        return <AlertTriangle className='h-5 w-5 text-gray-500' />;
    }
  };

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-2xl font-bold'>Maintenance Tickets</h1>
          <p className='text-gray-500'>Manage and track maintenance requests</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className='h-4 w-4 mr-2' />
          New Ticket
        </Button>
      </div>

      <div className='grid gap-4'>
        {tickets.map(ticket => (
          <Card key={ticket.id} className='p-4'>
            <div className='flex items-start justify-between'>
              <div className='space-y-1'>
                <div className='flex items-center space-x-2'>
                  {getStatusIcon(ticket.status)}
                  <h3 className='font-medium'>{ticket.title}</h3>
                  <span className={`text-sm ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                  </span>
                </div>
                <p className='text-sm text-gray-500'>
                  {ticket.propertyName} - Unit {ticket.unitNumber}
                </p>
                <p className='text-sm'>{ticket.description}</p>
              </div>
              <Button variant='outline' size='sm' onClick={() => setSelectedTicket(ticket)}>
                View Details
              </Button>
            </div>
            <div className='mt-4 text-sm text-gray-500'>
              <div className='flex items-center justify-between'>
                <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                <span>{ticket.assignedTo ? `Assigned to ${ticket.assignedTo}` : 'Unassigned'}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <MaintenanceTicketDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateTicket}
      />

      {selectedTicket && (
        <MaintenanceTicketDetails
          open={!!selectedTicket}
          onOpenChange={open => !open && setSelectedTicket(null)}
          ticket={selectedTicket}
          onUpdate={handleUpdateTicket}
        />
      )}
    </div>
  );
}
