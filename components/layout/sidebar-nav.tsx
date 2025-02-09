import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart2, FileText, Home, Key, Settings, Tool, Truck, Users } from 'react-feather'

const drawerWidth = 240

const menuItems = [
  { name: 'Dashboard', icon: Home, href: '/dashboard' },
  { name: 'Properties', icon: FileText, href: '/properties' },
  { name: 'Tenants', icon: Users, href: '/tenants' },
  { name: 'Inspections', icon: Key, href: '/inspections' },
  { name: 'Work Orders', icon: Tool, href: '/work-orders' },
  { name: 'Vendors', icon: Truck, href: '/vendors' },
  { name: 'Reports', icon: BarChart2, href: '/reports' },
  { name: 'Settings', icon: Settings, href: '/settings' },
]

export function SidebarNav() {
  const pathname = usePathname()
  const theme = useTheme()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          background: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <List sx={{ pt: 8 }}>
          {menuItems.map(({ name, icon: Icon, href }) => {
            const isActive = pathname === href

            return (
              <ListItem key={name} disablePadding>
                <Link href={href} style={{ width: '100%', textDecoration: 'none' }}>
                  <ListItemButton
                    selected={isActive}
                    sx={{
                      '&.Mui-selected': {
                        background: 'linear-gradient(45deg, #007FFF 30%, #0059B2 90%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #0059B2 30%, #004C99 90%)',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color: isActive ? 'white' : theme.palette.text.primary,
                      }}
                    >
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        fontWeight: isActive ? 600 : 400,
                      }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Drawer>
  )
}
