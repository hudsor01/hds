import process from 'process'

export const APP_NAME = 'Hudson Digital Solutions'
export const BASE_URL =
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    PROPERTIES: '/dashboard/properties',
    TENANTS: '/dashboard/tenants',
    SETTINGS: '/settings',
    PROFILE: '/profile'
} as const

export const API_ENDPOINTS = {
    AUTH: '/api/auth',
    PROPERTIES: '/api/properties',
    TENANTS: '/api/tenants',
    MAINTENANCE: '/api/maintenance'
} as const

export const DEFAULT_PAGINATION = {
    PAGE_SIZE: 10,
    PAGE_SIZES: [5, 10, 25, 50]
} as const
