import { ListItemProps } from '@mui/material'

export interface NavItemProps extends ListItemProps {
  href: string
  selected?: boolean
}

export interface NavigationProps {
  isAuthenticated: boolean
  role?: string
}
