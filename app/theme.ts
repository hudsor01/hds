'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#A7C7E7',
      light: '#C6E2FF',
      dark: '#87B3D9',
    },
    secondary: {
      main: '#F0F8FF',
      light: '#FFFFFF',
      dark: '#E0F0FF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F0F8FF',
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#F0F8FF',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#A7C7E7',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#87B3D9',
          },
        },
      },
    },
  },
  cssVariables: true,
})

export default theme
