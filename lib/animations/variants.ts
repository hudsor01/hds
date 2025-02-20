// Animation variants for Framer Motion
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
}

export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
}

export const slideInLeft = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
}

export const scale = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
}

export const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1]
        }
    }
}

// Card hover animations
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            type: 'tween',
            ease: 'easeInOut'
        }
    },
    hover: {
        scale: 1.02,
        y: -4,
        transition: {
            duration: 0.2,
            type: 'tween',
            ease: 'easeInOut'
        }
    }
}

// List item animations
export const listItem = {
    hidden: { opacity: 0, x: -20 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 1, 1]
        }
    }
}

// Page transitions
export const pageTransition = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        y: 20,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1]
        }
    }
}

// Dashboard card animations
export const dashboardCard = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1]
        }
    },
    hover: {
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
        transition: {
            duration: 0.2,
            ease: 'easeInOut'
        }
    },
    tap: {
        scale: 0.98
    }
}

// Button animations
export const buttonHover = {
    rest: {
        scale: 1,
        backgroundColor: 'var(--button-bg)'
    },
    hover: {
        scale: 1.05,
        backgroundColor: 'var(--button-hover-bg)'
    },
    tap: {
        scale: 0.95
    }
}

// Loading animations
export const loadingPulse = {
    initial: { opacity: 0.6 },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: 'reverse'
        }
    }
}

// Navigation menu animations
export const menuItem = {
    closed: {
        opacity: 0,
        x: -10,
        transition: {
            duration: 0.2
        }
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.2
        }
    }
}

// Dropdown animations
export const dropdown = {
    closed: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: 0.2,
            ease: 'easeInOut'
        }
    },
    open: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    }
}
