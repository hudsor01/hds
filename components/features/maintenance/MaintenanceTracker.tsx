import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography
} from '@mui/material'
import {
  Build as BuildIcon,
  Assignment as AssignmentIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material'

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

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error'
}

const statusIcons = {
  pending: <ScheduleIcon />,
  'in-progress': <BuildIcon />,
  completed: <CheckCircleIcon />
}

export function MaintenanceTracker({ items, onAddItem, onUpdateItem, onDeleteItem }: MaintenanceTrackerProps) {
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
      <Card>
        <CardHeader
          title="Maintenance Tracker"
          action={
            <Button
              variant="contained"
              startIcon={<AssignmentIcon />}
              onClick={() => {
                handleOpenDialog()
              }}
            >
              New Request
            </Button>
          }
        />
        <CardContent>
          <List>
            {items.map(item => (
              <ListItem
                key={item.id}
                divider
                secondaryAction={
                  <Box>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        handleOpenDialog(item)
                      }}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onDeleteItem?.(item.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemIcon>{statusIcons[item.status]}</ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Typography>
                      <Chip size="small" label={item.priority} color={priorityColors[item.priority]} />
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>{isEditing ? 'Edit Maintenance Request' : 'New Maintenance Request'}</DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} pt={1}>
              <TextField name="title" label="Title" required defaultValue={selectedItem?.title} />
              <TextField name="description" label="Description" multiline rows={4} defaultValue={selectedItem?.description} />
              <TextField select name="status" label="Status" required defaultValue={selectedItem?.status || 'pending'}>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>
              <TextField select name="priority" label="Priority" required defaultValue={selectedItem?.priority || 'low'}>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained">
              {isEditing ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
