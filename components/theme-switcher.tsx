'use client';

import {IconButton, Tooltip, useTheme as useMuiTheme} from '@mui/material';
import {motion} from 'framer-motion';
import {useTheme} from 'next-themes';
import {Moon, Sun} from 'react-feather';

export function ThemeSwitcher() {
  const {theme, setTheme} = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
      <Tooltip title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}>
        <IconButton
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          sx={{
            width: 40,
            height: 40,
            color: 'text.primary',
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>
      </Tooltip>
    </motion.div>
  );
}
