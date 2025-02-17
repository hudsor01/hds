'use client'

import type {
  Comment,
  MaintenanceRequestWithRelations,
  MaintenanceStatus,
  UpdateMaintenanceRequest
} from '@/types/maintenance-requests'
import { MaintenanceTicketDetailsProps } from '@/types/maintenance-requests'
import { Schedule as ClockIcon, Message as MessageIcon, Send as SendIcon } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { useState } from 'react'

export function MaintenanceTicketDetails({ open, onOpenChangeAction, ticket, onUpdateAction }: MaintenanceTicketDetailsProps) {
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<MaintenanceStatus>(ticket.status)
  const [comment, setComment] = useState('')

  const handleStatusChange = async (event: SelectChangeEvent) => {
    const newStatus = event.target.value as MaintenanceStatus
    setStatus(newStatus)
    setIsLoading(true)

    try {
      await onUpdateAction({
        id: ticket.id,
        status: newStatus
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddComment = async () => {
    if (!comment.trim()) return

    setIsLoading(true)
    try {
      const newComment: Comment = {
        content: comment,
        created_at: new Date().toISOString()
      }

      await onUpdateAction({
        id: ticket.id,
        comments: [...(ticket.comments || []), newComment]
      } as UpdateMaintenanceRequest)
      setComment('')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={() => {
        onOpenChangeAction(false)
      }}
      maxWidth="md"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${theme.palette.divider}`
        }
      }}
    >
      <DialogTitle>Maintenance Ticket Details</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          {/* Status */}
          <FormControl fullWidth size="small">
            <InputLabel id="status-label">Status</InputLabel>
            <Select labelId="status-label" value={status} onChange={handleStatusChange} disabled={isLoading} label="Status">
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          {/* Ticket Info */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {ticket.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {ticket.property?.name} - Unit {ticket.unit?.number}
            </Typography>
            <Typography variant="body1" paragraph>
              {ticket.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ClockIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Created on{' '}
                {new Date(ticket.created_at).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          </Box>

          {/* Comments */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Comments
            </Typography>
            <Stack spacing={2}>
              {ticket.comments?.map((comment: Comment, index: number) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{
                    p: 2,
                    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900]
                  }}
                >
                  <Typography variant="body2" gutterBottom>
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.created_at).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
            </Stack>

            {/* Add Comment */}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Add Comment
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={comment}
                  onChange={e => {
                    setComment(e.target.value)
                  }}
                  placeholder="Type your comment..."
                  disabled={isLoading}
                  size="small"
                  fullWidth
                  multiline
                  rows={2}
                />
                <Button
                  onClick={handleAddComment}
                  disabled={isLoading || !comment.trim()}
                  variant="contained"
                  startIcon={<SendIcon />}
                  sx={{ minWidth: 100 }}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
