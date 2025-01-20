'use client'

import { cn } from "@/lib/utils"
import { Drawer, IconButton, useMediaQuery, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, type ReactNode } from "react"
import { Box, Home, Menu, Settings, Tool, TrendingUp, Users } from "react-feather"
import { toast } from "sonner"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard" as Route,
    icon: Home,
    description: "Dashboard overview and key metrics"
  },
  {
    title: "Properties",
    href: "/dashboard/properties" as Route,
    icon: Box,
    description: "Manage your property portfolio"
  },
  {
    title: "Tenants",
    href: "/dashboard/tenants" as Route,
    icon: Users,
    description: "View and manage tenants"
  },
  {
    title: "Maintenance",
    href: "/dashboard/maintenance" as Route,
    icon: Tool,
    description: "Handle maintenance requests"
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics" as Route,
    icon: TrendingUp,
    description: "View performance metrics"
  }
] as const

const MotionLink = motion(Link)

const linkVariants = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  hover: { x: 5, transition: { duration: 0.2 } },
  tap: { scale: 0.95 }
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleLogout = () => {
    toast.success("Logged out successfully")
    // Add your logout logic here
  }

  const SidebarContent = () => (
    <motion.div
      className="flex flex-col h-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <motion.div
          className="w-8 h-8 bg-blue-600 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
        <span className="font-semibold">Hudson Digital</span>
      </div>
      <nav className="flex-1 flex flex-col px-3 py-4">
        <motion.div
          className="space-y-1"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {sidebarItems.map((item, index) => (
            <MotionLink
              key={item.href}
              href={item.href}
              variants={linkVariants}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
                "transition-colors duration-200",
                "hover:bg-blue-50 hover:text-blue-600",
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600"
              )}
              onClick={() => isMobile && setIsOpen(false)}
              whileHover="hover"
              whileTap="tap"
            >
              <item.icon className="h-5 w-5" />
              <div>
                <div>{item.title}</div>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </MotionLink>
          ))}
        </motion.div>
        <div className="flex-1" />
        <div className="space-y-2">
          <MotionLink
            href={"/dashboard/settings" as Route}
            variants={linkVariants}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg",
              "transition-colors duration-200",
              "hover:bg-blue-50 hover:text-blue-600",
              pathname === "/dashboard/settings"
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600"
            )}
            onClick={() => isMobile && setIsOpen(false)}
            whileHover="hover"
            whileTap="tap"
          >
            <Settings className="h-5 w-5" />
            <div>
              <div>Settings</div>
              <p className="text-xs text-gray-500">Manage your preferences</p>
            </div>
          </MotionLink>
          <motion.button
            variants={linkVariants}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg w-full",
              "transition-colors duration-200",
              "hover:bg-red-50 hover:text-red-600 text-gray-600"
            )}
            onClick={handleLogout}
            whileHover="hover"
            whileTap="tap"
          >
            <Settings className="h-5 w-5" />
            <div>
              <div>Logout</div>
              <p className="text-xs text-gray-500">Sign out of your account</p>
            </div>
          </motion.button>
        </div>
      </nav>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <IconButton
        className={cn(
          "lg:hidden fixed left-4 top-4 z-50",
          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        )}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </IconButton>

      {/* Mobile Navigation */}
      <Drawer
        anchor="left"
        open={isOpen && isMobile}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          className: "w-64"
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex">
        <aside className="fixed inset-y-0 left-0 w-64">
          <SidebarContent />
        </aside>
        <main className="flex-1 ml-64 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden p-6 pt-20">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
