import * as React from 'react'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { PageContainer } from '@toolpad/core/PageContainer'

const ToolbarAccountOverride = () => {
  return <div>Toolbar Account</div>;
};

const SidebarFooterAccount = () => {
  return <div>Sidebar Footer Account</div>;
};

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      slots={{
        toolbarAccount: ToolbarAccountOverride,
        sidebarFooter: SidebarFooterAccount
      }}
    >
      <PageContainer>
        {props.children}
        <Copyright sx={{ my: 4 }} />
      </PageContainer>
    </DashboardLayout>
  )
}
