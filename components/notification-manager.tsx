'use client'

import { showToast, type ToastData, type ToastType } from '@/components/toast'
import { CircularProgress } from '@mui/material'
import { create } from 'zustand'

// Define notification state interface
interface NotificationState {
  notifications: Map<string, ToastData>
  activeToasts: Set<string>
  addNotification: (notification: ToastData) => string
  removeNotification: (id: string) => void
  clearNotifications: () => void
  updateNotification: (id: string, updates: Partial<ToastData>) => void
}

// Create notification store
const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: new Map(),
  activeToasts: new Set(),

  addNotification: notification => {
    const id = notification.id || Math.random().toString(36).substr(2, 9)
    const notifications = get().notifications
    const activeToasts = get().activeToasts

    notifications.set(id, { ...notification, id })
    activeToasts.add(id)

    set({ notifications, activeToasts })
    return id
  },

  removeNotification: id => {
    const notifications = get().notifications
    const activeToasts = get().activeToasts

    notifications.delete(id)
    activeToasts.delete(id)

    set({ notifications, activeToasts })
  },

  clearNotifications: () => {
    set({ notifications: new Map(), activeToasts: new Set() })
  },

  updateNotification: (id, updates) => {
    const notifications = get().notifications
    const notification = notifications.get(id)

    if (notification) {
      notifications.set(id, { ...notification, ...updates })
      set({ notifications })
    }
  }
}))

// Create notification manager class
export class NotificationManager {
  private static store = useNotificationStore

  // Show a notification
  static show(notification: ToastData): string {
    const id = this.store.getState().addNotification(notification)
    showToast({ ...notification, id })
    return id
  }

  // Show a success notification
  static success(message: string, title?: string): string {
    return this.show({ type: 'success', message, title: title ?? '' })
  }

  // Show an error notification
  static error(message: string, title?: string): string {
    return this.show({ type: 'error', message, title: title ?? '' })
  }

  // Show a warning notification
  static warning(message: string, title?: string): string {
    return this.show({ type: 'warning', message, title: title ?? '' })
  }

  // Show an info notification
  static info(message: string, title?: string): string {
    return this.show({ type: 'info', message, title: title ?? '' })
  }

  // Show a promise-based notification
  static async promise<T>(
    promise: Promise<T>,
    {
      loading = 'Loading...',
      success = 'Operation completed successfully',
      error = 'Operation failed',
      onSuccess,
      onError
    }: {
      loading?: string
      success?: string | ((data: T) => string)
      error?: string | ((error: Error) => string)
      onSuccess?: (data: T) => void
      onError?: (error: Error) => void
    }
  ): Promise<T> {
    const id = this.show({
      type: 'info',
      message: loading,
      icon: <CircularProgress size={20} />,
      duration: Infinity // Keep loading state visible
    })

    try {
      const data = await promise

      // Handle success
      const successMessage = typeof success === 'function' ? success(data) : success
      this.store.getState().updateNotification(id, {
        type: 'success',
        message: successMessage,
        duration: 5000 // Reset to default duration
      })

      onSuccess?.(data)
      return data
    } catch (err) {
      // Handle error
      const errorObj = err instanceof Error ? err : new Error('An error occurred')
      const errorMessage = typeof error === 'function' ? error(errorObj) : error

      this.store.getState().updateNotification(id, {
        type: 'error',
        message: errorMessage,
        title: errorObj.message,
        duration: 5000 // Reset to default duration
      })

      onError?.(errorObj)
      throw errorObj
    }
  }

  // Show a rate-limited notification
  static throttle(key: string, notification: ToastData): string | null {
    const activeToasts = this.store.getState().activeToasts

    // Check if notification with same key is already active
    if (activeToasts.has(key)) {
      return null
    }

    // Show notification with the key as ID
    return this.show({ ...notification, id: key })
  }

  // Remove a specific notification
  static remove(id: string): void {
    this.store.getState().removeNotification(id)
  }

  // Clear all notifications
  static clear(): void {
    this.store.getState().clearNotifications()
  }

  // Update an existing notification
  static update(id: string, updates: Partial<ToastData>): void {
    const currentNotification = this.store.getState().notifications.get(id)

    if (currentNotification) {
      const updatedNotification = { ...currentNotification, ...updates }
      this.store.getState().updateNotification(id, updatedNotification)

      // Show updated toast if type or message changed
      if (updates.type !== currentNotification.type || updates.message !== currentNotification.message) {
        showToast(updatedNotification)
      }
    }
  }

  // Queue multiple notifications
  static queue(notifications: ToastData[], delay = 1000): void {
    notifications.forEach((notification, index) => {
      setTimeout(() => {
        this.show(notification)
      }, index * delay)
    })
  }
}

// Create a hook to access notifications in components
export const useNotifications = () => {
  const notifications = useNotificationStore(state => state.notifications)
  const activeToasts = useNotificationStore(state => state.activeToasts)

  return {
    notifications,
    activeToasts,
    show: NotificationManager.show.bind(NotificationManager),
    success: NotificationManager.success.bind(NotificationManager),
    error: NotificationManager.error.bind(NotificationManager),
    warning: NotificationManager.warning.bind(NotificationManager),
    info: NotificationManager.info.bind(NotificationManager),
    promise: NotificationManager.promise.bind(NotificationManager),
    remove: NotificationManager.remove.bind(NotificationManager),
    clear: NotificationManager.clear.bind(NotificationManager),
    update: NotificationManager.update.bind(NotificationManager),
    queue: NotificationManager.queue.bind(NotificationManager),
    throttle: NotificationManager.throttle.bind(NotificationManager)
  }
}

// Types export
export type { NotificationState, ToastData, ToastType }
