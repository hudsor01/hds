import { Home, Settings, Users } from 'react-feather'
import { routes } from '../routes'

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]

export const ACTIVITY_TYPES = {
  MAINTENANCE: 'MAINTENANCE',
  PAYMENT: 'PAYMENT',
} as const

export type ActivityType = typeof ACTIVITY_TYPES[keyof typeof ACTIVITY_TYPES]

export const ACTIVITY_STATUS = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
} as const

export type ActivityStatus = typeof ACTIVITY_STATUS[keyof typeof ACTIVITY_STATUS]

export const PRIORITY_LEVELS = {
  low: "Low",
  medium: "Medium",
  high: "High",
} as const

export type PriorityLevel = typeof PRIORITY_LEVELS[keyof typeof PRIORITY_LEVELS]

export const NAVIGATION_LINKS = [
  { name: 'Home', href: routes.dashboard, icon: Home },
  { name: 'Properties', href: routes.properties.index, icon: Home },
  { name: 'Tenants', href: routes.tenants.index, icon: Users },
  { name: 'Settings', href: routes.settings, icon: Settings },
] as const

export const ACTIVITY_FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'MAINTENANCE', label: 'Maintenance' },
  { value: 'PAYMENT', label: 'Payments' },
] as const

export const PRIORITY_LABELS = {
  low: "Low Priority",
  medium: "Medium Priority",
  high: "High Priority",
} as const

export const STATUS_LABELS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
} as const

export const PROPERTY_STATUS = {
  active: "Active",
  inactive: "Inactive",
  maintenance: "Under Maintenance",
} as const

export const PROPERTY_TYPES = {
  apartment: "Apartment",
  house: "House",
  condo: "Condominium",
  commercial: "Commercial",
} as const
