'use client'

import { useCallback, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material'
import { ConfirmDialog } from '@/components/common/confirm-dialog'
import { toast } from 'sonner'

interface PropertyActionsProps {
  propertyId: string
  propertyName: string
  onSuccess?: () => void
}

export function PropertyActions({ propertyId, propertyName, onSuccess }: PropertyActionsProps) {
  const router = useRouter()
  const theme = useTheme()
  const [isPending, startTransition] = useTransition()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleEdit = useCallback(() => {
    startTransition(() => {
      router.push(`/properties/${propertyId}/edit`)
      handleCloseMenu()
    })
  }, [propertyId, router, handleCloseMenu])

  const handleDelete = useCallback(async () => {
    try {
      await deleteProperty.mutateAsync(propertyId)
      toast.success('Property deleted successfully')
      setShowDeleteDialog(false)
      onSuccess?.()
    } catch (error) {
      toast.error('Failed to delete property. Please try again.')
      console.error('Delete property error:', error)
    }
  }, [propertyId, deleteProperty, onSuccess])

  const handleDeleteClick = useCallback(() => {
    setShowDeleteDialog(true)
    handleCloseMenu()
  }, [handleCloseMenu])

  return (
    <>
      <IconButton
        onClick={handleOpenMenu}
        aria-label="property actions"
        disabled={isPending}
        sx={{
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 200 }
        }}
      >
        <MenuItem onClick={handleEdit} disabled={isPending}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={handleDeleteClick}
          disabled={isPending}
          sx={{
            color: 'error.main',
            '&:hover': {
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.contrastText
            }
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Property"
        message={`Are you sure you want to delete ${propertyName}? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        isLoading={deleteProperty.isPending}
        severity="error"
      />
    </>
  )
}
