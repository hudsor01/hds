import { DataGrid as MuiDataGrid } from '@mui/x-data-grid'
import type { DataGridProps as MuiDataGridProps } from '@mui/x-data-grid'
import { styled } from '@mui/material'

const StyledDataGrid = styled(MuiDataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]
  },
  '& .MuiDataGrid-cell': {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

export type DataGridProps = MuiDataGridProps

export function DataGrid(props: DataGridProps) {
  return <StyledDataGrid autoHeight disableColumnMenu disableRowSelectionOnClick {...props} />
}
