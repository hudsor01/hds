import * as React from 'react'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { PageContainer } from '@toolpad/core/PageContainer'
import { ToolbarAccountOverride, SidebarFooterAccount } from '@/components/dashboard/layout'
import { ErrorBoundary } from '@/components/error-boundary'
import { Copyright } from '@/components/copyright'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <DashboardLayout
        slots={{
          toolbarAccount: ToolbarAccountOverride,
          sidebarFooter: SidebarFooterAccount
        }}
        slotProps={{
          pageContainer: {
            maxWidth: 'xl'
          }
        }}
      >
        <PageContainer>
          {children}
          <Copyright sx={{ my: 4 }} />
        </PageContainer>
      </DashboardLayout>
    </ErrorBoundary>
  )
}
