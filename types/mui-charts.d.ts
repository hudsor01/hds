import * as React from 'react'

declare module '@mui/material/styles' {
  interface Components {
    MuiCharts?: {
      styleOverrides?: {
        tick?: React.CSSProperties
      }
    }
  }
}
