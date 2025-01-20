'use client'

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@mui/material"
import { motion } from "framer-motion"
import type { Route } from "next"
import Link from "next/link"
import { Box, CreditCard, Settings, Users } from "react-feather"

const actions = [
  {
    title: "Add Property",
    href: "/dashboard/properties/new" as Route,
    icon: Box,
    description: "List a new property in your portfolio",
    color: "blue"
  },
  {
    title: "Manage Tenants",
    href: "/dashboard/tenants" as Route,
    icon: Users,
    description: "View and manage your tenants",
    color: "green"
  },
  {
    title: "Process Payments",
    href: "/dashboard/payments" as Route,
    icon: CreditCard,
    description: "Handle rent payments and transactions",
    color: "purple"
  },
  {
    title: "Settings",
    href: "/dashboard/settings" as Route,
    icon: Settings,
    description: "Configure your account preferences",
    color: "orange"
  }
] as const

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
}

const iconVariants = {
  initial: { rotate: -10, scale: 0.9 },
  animate: { rotate: 0, scale: 1 },
  hover: { rotate: 10, scale: 1.1 }
}

export function QuickActions() {
  return (
    <motion.div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
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
      {actions.map((action) => (
        <Link key={action.href} href={action.href}>
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4">
                  <motion.div
                    variants={iconVariants}
                    className={cn(
                      "p-3 rounded-full w-fit",
                      action.color === "blue" && "bg-blue-100 text-blue-600",
                      action.color === "green" && "bg-green-100 text-green-600",
                      action.color === "purple" && "bg-purple-100 text-purple-600",
                      action.color === "orange" && "bg-orange-100 text-orange-600"
                    )}
                  >
                    <action.icon className="h-5 w-5" />
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  )
}
