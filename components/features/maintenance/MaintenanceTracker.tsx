import {
  Assignment as AssignmentIcon,
  Build as BuildIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import React, { useState } from 'react'

interface MaintenanceItem {
  id: string
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

interface MaintenanceTrackerProps {
  items: MaintenanceItem[]
  onAddItem?: (item: Omit<MaintenanceItem, 'id' | 'createdAt'>) => void
  onUpdateItem?: (id: string, updates: Partial<MaintenanceItem>) => void
  onDeleteItem?: (id: string) => void
}

const priorityColors: Record<MaintenanceItem['priority'], 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error'
}

const statusIcons: Record<MaintenanceItem['status'], React.ReactElement> = {
  pending: <ScheduleIcon />,
  'in-progress': <BuildIcon />,
  completed: <CheckCircleIcon />
}

export function MaintenanceTracker({ items, onAddItem, onUpdateItem, onDeleteItem }: MaintenanceTrackerProps) {
  const theme = useTheme()
  const [selectedItem, setSelectedItem] = useState<MaintenanceItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleOpenDialog = (item?: MaintenanceItem) => {
    setSelectedItem(item || null)
    setIsEditing(!!item)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setSelectedItem(null)
    setIsEditing(false)
    setIsDialogOpen(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as MaintenanceItem['status'],
      priority: formData.get('priority') as MaintenanceItem['priority']
    }

    if (isEditing && selectedItem) {
      onUpdateItem?.(selectedItem.id, data)
    } else {
      onAddItem?.(data)
    }

    handleCloseDialog()
  }

  return (
    <>
      <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <CardHeader
          title="Maintenance Tracker"
          action={
            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => {
                handleOpenDialog()
              }}
              size="small"
            >
              New Request
            </Button>
          }
        />
        <CardContent>
          <List sx={{ width: '100%' }}>
            {items.map(item => (
              <ListItem
                key={item.id}
                divider
                secondaryAction={
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        handleOpenDialog(item)
                      }}
                      size="small"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => onDeleteItem?.(item.id)}
                      size="small"
                      sx={{ color: theme.palette.error.main }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>{statusIcons[item.status]}</ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>
                      <Chip
                        size="small"
                        label={item.priority.toUpperCase()}
                        color={priorityColors[item.priority]}
                        sx={{ height: 20 }}
                      />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              borderRadius: theme.shape.borderRadius,
              border: `1px solid ${theme.palette.divider}`
            }
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditing ? 'Edit Maintenance Request' : 'New Maintenance Request'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField name="title" label="Title" required defaultValue={selectedItem?.title} size="small" fullWidth />
              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                defaultValue={selectedItem?.description}
                size="small"
                fullWidth
              />
              <TextField
                select
                name="status"
                label="Status"
                required
                defaultValue={selectedItem?.status || 'pending'}
                size="small"
                fullWidth
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
              <TextField
                select
                name="priority"
                label="Priority"
                required
                defaultValue={selectedItem?.priority || 'low'}
                size="small"
                fullWidth
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDialog} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
