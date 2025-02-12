import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names using clsx and merges Tailwind classes properly
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date using Intl.DateTimeFormat
 */
export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date))
}

/**
 * Checks if we're running on the server
 */
export const isServer = typeof window === 'undefined'

/**
 * Checks if we're running on the client
 */
export const isClient = !isServer

/**
 * Delays execution for a specified number of milliseconds
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Safely access nested object properties
 */
export function get(obj: any, path: string, defaultValue: any = undefined) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

/**
 * Truncates a string to a specified length
 */
export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

/**
 * Generates a random string of specified length
 */
export function generateId(length: number = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
}

/**
 * Debounces a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
