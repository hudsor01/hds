'use client'

import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Menu, Tool, Users } from "react-feather"

const sidebarItems = [
  {
    title: "Dashboard",
    href: { pathname: "/dashboard" },
    icon: Home
  },
  {
    title: "Properties",
    href: { pathname: "/dashboard/properties" },
    icon: Home
  },
  {
    title: "Tenants",
    href: { pathname: "/dashboard/tenants" },
    icon: Users
  },
  {
    title: "Maintenance",
    href: { pathname: "/dashboard/maintenance" },
    icon: Tool
  },
  {
    title: "Leases",
    href: { pathname: "/dashboard/leases" },
    icon: Users
  },
  {
    title: "Analytics",
    href: { pathname: "/dashboard/analytics" },
    icon: Users
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden fixed left-4 top-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-64 left-0">
          <nav className="flex flex-col gap-4 mt-8">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href.pathname}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100",
                    pathname === item.href.pathname ? "bg-blue-50 text-blue-600" : "text-gray-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Link>
              )
            })}
            <div className="flex-1" />
            <Link
              href={{ pathname: "/dashboard/settings" }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100",
                pathname === "/dashboard/settings" ? "bg-blue-50 text-blue-600" : "text-gray-600"
              )}
            >
              <Tool className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex">
        <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-6 py-4 border-b">
              <div className="w-8 h-8 bg-blue-600 rounded-lg" />
              <span className="font-semibold">Hudson Digital</span>
            </div>
            <nav className="flex-1 flex flex-col px-3 py-4">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href.pathname}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 mb-1",
                      pathname === item.href.pathname ? "bg-blue-50 text-blue-600" : "text-gray-600"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                )
              })}
              <div className="flex-1" />
              <Link
                href={{ pathname: "/dashboard/settings" }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100",
                  pathname === "/dashboard/settings" ? "bg-blue-50 text-blue-600" : "text-gray-600"
                )}
              >
                <Tool className="h-5 w-5" />
                Settings
              </Link>
            </nav>
          </div>
        </aside>
        <main className="flex-1 ml-64">
          {children}
        </main>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}
