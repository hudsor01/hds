import {UserButton} from '@clerk/nextjs';
import {AppBar, Box, IconButton, Toolbar} from '@mui/material';
import {Menu} from 'react-feather';

interface DashboardHeaderProps {
  onSidebarOpen: () => void;
}

export function DashboardHeader({onSidebarOpen}: DashboardHeaderProps) {
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
