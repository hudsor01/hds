'use client'

import { BaseDataGrid } from '@/components/common/data-grid'
import { formatCurrency } from '@/utils/format'
import type { PropertyRow, PropertyTableProps } from '@/types/index'
import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import { Typography, Box, Chip, IconButton, Menu, MenuItem } from '@mui/material'
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useCallback, useMemo, useState } from 'react'

interface ExtendedPropertyTableProps extends PropertyTableProps {
  onEdit?: (property: PropertyRow) => void
  onViewDetails?: (property: PropertyRow) => void
  onManageTenants?: (property: PropertyRow) => void
}

interface MenuState {
  anchorEl: HTMLElement | null
  property: PropertyRow | null
}

export function PropertyTable({
  properties,
  isLoading,
  onEdit,
  onViewDetails,
  onManageTenants
}: ExtendedPropertyTableProps) {
  const [menuState, setMenuState] = useState<MenuState>({
    anchorEl: null,
    property: null
  })

  const handleOpenMenu = useCallback(
    (event: React.MouseEvent<HTMLElement>, property: PropertyRow) => {
      setMenuState({
        anchorEl: event.currentTarget,
        property
      })
    },
    []
  )

  const handleCloseMenu = useCallback(() => {
    setMenuState({
      anchorEl: null,
      property: null
    })
  }, [])

  const getStatusColor = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success'
      case 'inactive':
        return 'error'
      default:
        return 'warning'
    }
  }, [])

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'name',
        headerName: 'Property',
        width: 250,
        renderCell: (params: GridRenderCellParams<PropertyRow>) => (
          <Box>
            <Typography variant="body2" component="div">
              {params.row.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {params.row.address}
            </Typography>
          </Box>
        )
      },
      {
        field: 'property_status',
        headerName: 'Status',
        width: 130,
        renderCell: (params: GridRenderCellParams<PropertyRow>) => (
          <Chip label={params.value} color={getStatusColor(params.value)} size="small" />
        )
      },
      {
        field: 'rent_amount',
        headerName: 'Rent',
        width: 130,
        valueFormatter: ({ value }: { value: number }) => formatCurrency(value)
      },
      {
        field: 'property_type',
        headerName: 'Type',
        width: 130
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 100,
        sortable: false,
        renderCell: (params: GridRenderCellParams<PropertyRow>) => (
          <>
            <IconButton onClick={e => handleOpenMenu(e, params.row)} aria-label="property actions">
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={menuState.anchorEl}
              open={Boolean(menuState.anchorEl) && menuState.property?.id === params.row.id}
              onClose={handleCloseMenu}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {onEdit && (
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    onEdit(params.row)
                  }}
                >
                  Edit
                </MenuItem>
              )}
              {onViewDetails && (
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    onViewDetails(params.row)
                  }}
                >
                  View Details
                </MenuItem>
              )}
              {onManageTenants && (
                <MenuItem
                  onClick={() => {
                    handleCloseMenu()
                    onManageTenants(params.row)
                  }}
                >
                  Manage Tenants
                </MenuItem>
              )}
            </Menu>
          </>
        )
      }
    ],
    [getStatusColor, handleOpenMenu, handleCloseMenu, onEdit, onViewDetails, onManageTenants]
  )

  return (
    <BaseDataGrid
      data={properties}
      columns={columns}
      isLoading={isLoading}
      pageSize={10}
      autoHeight
      disableSelectionOnClick
    />
  )
}
