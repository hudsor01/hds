'use client'

import { useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { dismissNotification } from '@/store/slices/uiSlice'

export function Notifications() {
    const dispatch = useAppDispatch()
    const notifications = useAppSelector(state =>
        state.ui.notifications.filter(n => !n.dismissed)
    )

    const handleClose = (id: string) => {
        dispatch(dismissNotification(id))
    }

    // Auto-dismiss notifications after 6 seconds
    useEffect(() => {
        const timeouts = notifications.map(notification => {
            return setTimeout(() => {
                handleClose(notification.id)
            }, 6000)
        })

        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout))
        }
    }, [notifications])

    return (
        <>
            {notifications.map(notification => (
                <Snackbar
                    key={notification.id}
                    open={!notification.dismissed}
                    onClose={() => handleClose(notification.id)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    autoHideDuration={6000}
                >
                    <Alert
                        onClose={() => handleClose(notification.id)}
                        severity={notification.type}
                        variant="filled"
                        elevation={6}
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>
            ))}
        </>
    )
}
