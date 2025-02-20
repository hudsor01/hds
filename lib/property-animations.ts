'use client'
import type { Animations } from '@/types'

export const listAnimation: Animations.ListAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: index => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.1,
            duration: 0.2
        }
    }),
    exit: { opacity: 0, y: -20 }
}

export const dataUpdateAnimation: Animations.DataUpdateAnimation = {
    hidden: { opacity: 0.6, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
        }
    }
}

export const tabPanelAnimation: Animations.TabPanelAnimation = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2
        }
    },
    exit: {
        opacity: 0,
        x: 10
    }
}

export const chartAnimation: Animations.ChartAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            stiffness: 200,
            damping: 20
        }
    }
}

export const filterAnimation: Animations.FilterAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: 'auto',
        transition: {
            height: {
                type: 'spring',
                stiffness: 500,
                damping: 30
            },
            opacity: {
                duration: 0.2
            }
        }
    },
    exit: {
        opacity: 0,
        height: 0
    }
}

export const notificationAnimation: Animations.NotificationAnimation =
    {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.2
            }
        }
    }

// Animation preset map for easy lookup
export const animationPresets: Animations.PresetMap = {
    list: listAnimation,
    dataUpdate: dataUpdateAnimation,
    tabPanel: tabPanelAnimation,
    chart: chartAnimation,
    filter: filterAnimation,
    notification: notificationAnimation
}
