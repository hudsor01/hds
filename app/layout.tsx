// app/layout.tsx
import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { theme } from '@/lib/theme'
import { Navbar } from '@/components/navbar'
import { AuthProvider } from '@/lib/auth/auth-provider'

export const metadata: Metadata = {
  title: 'HDS Platform',
  description: 'Modern property management solution'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Navbar />
            <CssBaseline />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
