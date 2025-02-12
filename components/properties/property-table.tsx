'use client'

import { BaseDataGrid } from '@/components/common/data-grid'
import { formatCurrency } from '@/utils/format'
import type { PropertyRow, PropertyTableProps } from '@/types/property'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid'
import { useState } from 'react'

interface ExtendedPropertyTableProps extends PropertyTableProps {
  onEdit?: (property: PropertyRow) => void
  onViewDetails?: (property: PropertyRow) => void
  onManageTenants?: (property: PropertyRow) => void
}

export function PropertyTable({
  properties,
  isLoading,
  onEdit,
  onViewDetails,
  onManageTenants
}: ExtendedPropertyTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedProperty, setSelectedProperty] = useState<PropertyRow | null>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, property: PropertyRow) => {
    setAnchorEl(event.currentTarget)
    setSelectedProperty(property)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedProperty(null)
  }

  const columns: GridColDef[] = [
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
        <Chip
          label={params.value}
          color={
            params.value === 'active'
              ? 'success'
              : params.value === 'inactive'
                ? 'error'
                : 'warning'
          }
          size="small"
        />
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
          <IconButton onClick={e => handleOpenMenu(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedProperty?.id === params.row.id}
            onClose={handleCloseMenu}
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
  ]

  return <BaseDataGrid data={properties} columns={columns} isLoading={isLoading} pageSize={10} />
}
