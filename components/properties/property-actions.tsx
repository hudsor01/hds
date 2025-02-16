'use client'

import { useState } from 'react'
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tooltip
} from '@mui/material'
import {
  MoreVertical,
  Edit,
  Trash2,
  Users,
  FileText,
  Tool,
  DollarSign,
  Camera
} from 'react-feather'
import { type Property } from '@/types/properties'
import { cn } from '@/lib/utils'

export interface PropertyAction {
  label: string
  icon: JSX.Element
  onClick: () => void
  color?: 'inherit' | 'primary' | 'secondary' | 'error'
  requiresConfirmation?: boolean
  confirmationMessage?: string
  tooltip?: string
  disabled?: boolean
}

export interface PropertyActionsProps {
  property: Property
  className?: string
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onManageTenants?: (property: Property) => void
  onViewDocuments?: (property: Property) => void
  onManageMaintenance?: (property: Property) => void
  onManageFinancials?: (property: Property) => void
  onManagePhotos?: (property: Property) => void
  customActions?: PropertyAction[]
  disabled?: boolean
  size?: 'small' | 'medium' | 'large'
  tooltipPlacement?: 'top' | 'right' | 'bottom' | 'left'
}

export function PropertyActions({
  property,
  className,
  onEdit,
  onDelete,
  onManageTenants,
  onViewDocuments,
  onManageMaintenance,
  onManageFinancials,
  onManagePhotos,
  customActions = [],
  disabled = false,
  size = 'medium',
  tooltipPlacement = 'bottom'
}: PropertyActionsProps): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [confirmAction, setConfirmAction] = useState<PropertyAction | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleAction = (action: PropertyAction) => {
    if (action.requiresConfirmation) {
      setConfirmAction(action)
    } else {
      action.onClick()
      handleCloseMenu()
    }
  }

  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction.onClick()
      setConfirmAction(null)
      handleCloseMenu()
    }
  }

  const handleCancelConfirmation = () => {
    setConfirmAction(null)
    handleCloseMenu()
  }

  const defaultActions: PropertyAction[] = [
    onEdit && {
      label: 'Edit Property',
      icon: <Edit className="h-4 w-4" />,
      onClick: () => onEdit(property),
      tooltip: 'Edit property details'
    },
    onManageTenants && {
      label: 'Manage Tenants',
      icon: <Users className="h-4 w-4" />,
      onClick: () => onManageTenants(property),
      tooltip: 'Manage property tenants'
    },
    onViewDocuments && {
      label: 'View Documents',
      icon: <FileText className="h-4 w-4" />,
      onClick: () => onViewDocuments(property),
      tooltip: 'View property documents'
    },
    onManageMaintenance && {
      label: 'Maintenance',
      icon: <Tool className="h-4 w-4" />,
      onClick: () => onManageMaintenance(property),
      tooltip: 'Manage maintenance requests'
    },
    onManageFinancials && {
      label: 'Financials',
      icon: <DollarSign className="h-4 w-4" />,
      onClick: () => onManageFinancials(property),
      tooltip: 'View financial details'
    },
    onManagePhotos && {
      label: 'Manage Photos',
      icon: <Camera className="h-4 w-4" />,
      onClick: () => onManagePhotos(property),
      tooltip: 'Manage property photos'
    },
    onDelete && {
      label: 'Delete Property',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: () => onDelete(property),
      color: 'error',
      requiresConfirmation: true,
      confirmationMessage: 'Are you sure you want to delete this property? This action cannot be undone.',
      tooltip: 'Delete property'
    }
  ].filter(Boolean) as PropertyAction[]

  const actions = [...defaultActions, ...customActions]

  return (
    <Box className={cn('flex items-center', className)}>
      <Tooltip title={disabled ? 'Actions not available' : 'Property Actions'} placement={tooltipPlacement}>
        <span>
          <IconButton
            onClick={handleOpenMenu}
            disabled={disabled}
            size={size}
            className={cn(
              'transition-colors',
              disabled ? 'text-gray-300' : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <MoreVertical className="h-5 w-5" />
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {actions.map((action, index) => (
          <MenuItem
            key={action.label}
            onClick={() => handleAction(action)}
            disabled={action.disabled}
            sx={{
              color: action.color === 'error' ? 'error.main' : undefined,
              '&:not(:last-child)': { mb: 0.5 }
            }}
          >
            <ListItemIcon
              sx={{
                color: action.color === 'error' ? 'error.main' : undefined,
                minWidth: 36
              }}
            >
              {action.icon}
            </ListItemIcon>
            <ListItemText primary={action.label} />
          </MenuItem>
        ))}
      </Menu>

      <Dialog
        open={Boolean(confirmAction)}
        onClose={handleCancelConfirmation}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmAction?.confirmationMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelConfirmation} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmAction}
            color={confirmAction?.color || 'primary'}
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}