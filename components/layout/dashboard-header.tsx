import {UserButton} from '@clerk/nextjs';
import {AppBar, Box, IconButton, Toolbar, Tooltip} from '@mui/material';
import {ChevronLeft, ChevronRight, Menu} from 'react-feather';

interface DashboardHeaderProps {
  onSidebarOpen: () => void;
  onSidebarToggle: () => void;
  sidebarCollapsed: boolean;
}

export function DashboardHeader({
  onSidebarOpen,
  onSidebarToggle,
  sidebarCollapsed,
}: DashboardHeaderProps) {
  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: 'background.paper',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onSidebarOpen}
          edge='start'
          sx={{
            marginRight: 2,
            display: {xs: 'block', lg: 'none'},
          }}
        >
          <Menu />
        </IconButton>

        <IconButton
          onClick={onSidebarToggle}
          sx={{
            marginRight: 2,
            display: {xs: 'none', lg: 'block'},
          }}
        >
          <Tooltip title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Tooltip>
        </IconButton>

        <Box sx={{flexGrow: 1}} />

        <Box sx={{ml: 2}}>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'w-8 h-8',
                userButtonPopoverCard: 'w-64',
                userButtonPopoverActionButton: 'text-sm',
                userButtonPopoverActionButtonText: 'text-sm',
                userButtonPopoverFooter: 'hidden',
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
