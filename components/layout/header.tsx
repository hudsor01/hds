'use client';

import {ThemeSwitcher} from '../theme-switcher';
import {Avatar, Box, IconButton, Stack, Tooltip, Typography, useMediaQuery} from '@mui/material';
import {alpha, useTheme} from '@mui/material/styles';
import {motion} from 'framer-motion';
import {Bell, Menu} from 'react-feather';

interface HeaderProps {
  onOpenSidebarAction: () => void;
}

const containerVariants = {
  initial: {y: -20, opacity: 0},
  animate: {y: 0, opacity: 1, transition: {duration: 0.3}},
};

const itemVariants = {
  initial: {scale: 0.8, opacity: 0},
  animate: {scale: 1, opacity: 1},
};

export function Header({onOpenSidebarAction}: HeaderProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <motion.div variants={containerVariants} initial='initial' animate='animate'>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: {xs: 2, sm: 3},
          py: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {isMobile && (
          <motion.div variants={itemVariants}>
            <IconButton
              onClick={onOpenSidebarAction}
              sx={{
                width: 40,
                height: 40,
                color: 'text.primary',
              }}
            >
              <Menu size={20} />
            </IconButton>
          </motion.div>
        )}

        <Box sx={{flexGrow: 1}} />

        <Stack direction='row' alignItems='center' spacing={{xs: 0.5, sm: 2}}>
          {/* Theme Toggle */}
          <motion.div variants={itemVariants}>
            <ThemeSwitcher />
          </motion.div>

          {/* Notifications */}
          <motion.div variants={itemVariants}>
            <Tooltip title='Notifications'>
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  color: 'text.primary',
                }}
              >
                <Bell size={20} />
              </IconButton>
            </Tooltip>
          </motion.div>

          {/* Profile */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                p: 0.5,
                bgcolor: theme => alpha(theme.palette.primary.main, 0.04),
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: theme => alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <Stack direction='row' alignItems='center' spacing={2}>
                <Avatar
                  src='/avatar.jpg'
                  alt='User Avatar'
                  sx={{
                    width: 32,
                    height: 32,
                    border: '2px solid',
                    borderColor: 'background.paper',
                  }}
                />
                <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                  <Typography variant='subtitle2'>John Doe</Typography>
                  <Typography variant='caption' sx={{color: 'text.secondary'}}>
                    Administrator
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </Stack>
      </Box>
    </motion.div>
  );
}
