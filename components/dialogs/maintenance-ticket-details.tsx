'use client';

import { Button } from '@/components/ui/buttons/button';
import type {
  MaintenanceStatus,
  MaintenanceRequestWithRelations,
  UpdateMaintenanceRequest,
  Comment,
} from '@/types/maintenance_requests';
import type { SelectChangeEvent } from '@mui/material';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialogs/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectItem } from '@/components/ui/select';
import Textarea from '@/components/ui/textarea';
import { useState } from 'react';
import { Clock, MessageSquare } from 'react-feather';

interface MaintenanceTicketDetailsProps {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  ticket: MaintenanceRequestWithRelations;
  onUpdateAction: (data: UpdateMaintenanceRequest) => Promise<void>;
}

export function MaintenanceTicketDetails({
  open,
  onOpenChangeAction,
  ticket,
  onUpdateAction,
}: MaintenanceTicketDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<MaintenanceStatus>(ticket.status);
  const [comment, setComment] = useState('');

  const handleStatusChange = async (event: SelectChangeEvent<unknown>) => {
    const newStatus = event.target.value as MaintenanceStatus;
    setStatus(newStatus);
    setIsLoading(true);

    try {
      await onUpdateAction({
        id: ticket.id,
        status: newStatus,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setIsLoading(true);
    try {
      const newComment: Comment = {
        content: comment,
        created_at: new Date().toISOString(),
      };

      await onUpdateAction({
        id: ticket.id,
        comments: [...(ticket.comments || []), newComment],
      } as UpdateMaintenanceRequest);
      setComment('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Maintenance Ticket Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={status}
              onChange={handleStatusChange}
              disabled={isLoading}
            >
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </Select>
          </div>

          {/* Ticket Info */}
          <div className="space-y-2">
            <h3 className="font-medium">{ticket.title}</h3>
            <p className="text-sm text-gray-500">
              {ticket.property?.name} - Unit {ticket.unit?.number}
            </p>
            <p className="text-sm">{ticket.description}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>
                Created on{' '}
                {new Date(ticket.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <h4 className="font-medium">Comments</h4>
            <div className="space-y-4">
              {ticket.comments?.map((comment: Comment, index: number) => (
                <div key={index} className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm">{comment.content}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(comment.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Add Comment */}
            <div className="space-y-2">
              <Label>Add Comment</Label>
              <div className="flex space-x-2">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Type your comment..."
                  disabled={isLoading}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={isLoading || !comment.trim()}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
