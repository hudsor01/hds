'use client'

import { Button } from "@/components/ui/button"
import
  {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectItem } from "@/components/ui/select"
import Textarea from "@/components/ui/textarea"
import type { MaintenanceStatus, MaintenanceTicket, UpdateMaintenanceTicket } from "@/lib/types/maintenance"
import type { SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock, MessageSquare, Paperclip } from "react-feather"

interface MaintenanceTicketDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  ticket: MaintenanceTicket
  onUpdate: (data: UpdateMaintenanceTicket) => Promise<void>
}

export function MaintenanceTicketDetails({
  open,
  onOpenChange,
  ticket,
  onUpdate,
}: MaintenanceTicketDetailsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [newComment, setNewComment] = useState("")

  const getStatusIcon = (status: MaintenanceStatus) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "cancelled":
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  const handleStatusUpdate = async (event: SelectChangeEvent<unknown>) => {
    const newStatus = event.target.value as MaintenanceStatus
    setIsLoading(true)
    try {
      await onUpdate({
        id: ticket.id,
        status: newStatus,
      })
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsLoading(true)
    try {
      // TODO: Implement comment addition
      console.log("Adding comment:", newComment)
      setNewComment("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getStatusIcon(ticket.status)}
            <span>{ticket.title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Ticket Details */}
          <div className="space-y-4">
            <div>
              <Label>Property</Label>
              <p className="text-sm mt-1">{ticket.propertyName}</p>
            </div>

            {ticket.unitNumber && (
              <div>
                <Label>Unit</Label>
                <p className="text-sm mt-1">{ticket.unitNumber}</p>
              </div>
            )}

            <div>
              <Label>Description</Label>
              <p className="text-sm mt-1">{ticket.description}</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <Label>Status</Label>
                <Select
                  value={ticket.status}
                  onChange={handleStatusUpdate}
                  disabled={isLoading}
                  placeholder="Select status"
                >
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </Select>
              </div>

              <div>
                <Label>Priority</Label>
                <p className="text-sm mt-1 capitalize">{ticket.priority}</p>
              </div>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
              <span>
                {ticket.assignedTo ? `Assigned to ${ticket.assignedTo}` : "Unassigned"}
              </span>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="font-medium mb-4">Comments</h3>
            <div className="space-y-4">
              {ticket.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{comment.createdBy}</span>
                    <span className="text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  {comment.attachments && comment.attachments.length > 0 && (
                    <div className="mt-2 flex items-center text-sm text-blue-600">
                      <Paperclip className="h-4 w-4 mr-1" />
                      <span>{comment.attachments.length} attachments</span>
                    </div>
                  )}
                </div>
              ))}

              <form onSubmit={handleAddComment} className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="submit"
                    disabled={isLoading || !newComment.trim()}
                    className="flex items-center"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
