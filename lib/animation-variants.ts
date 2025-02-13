import { TargetAndTransition, Variant } from 'framer-motion'
import type { AnimationVariant } from '@/types/animation'

// Core animations
export const fadeInOut: AnimationVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
}

export const modalVariants: AnimationVariant = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.15 }
  }
}

export const slideInOut: AnimationVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.1 }
  }
}

// UI Component animations
export const listItem: AnimationVariant = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 }
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.1 }
  }
}

export const notificationVariants: AnimationVariant = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.15 }
  }
}

// Layout animations
export const pageTransition: AnimationVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0 }
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

export const scaleInOut: Record<string, Variant> = {
  hidden: {
    opacity: 0,
    scale: 0.85
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.2
    }
  }
}

export const staggerChildren: TargetAndTransition = {
  transition: {
    staggerChildren: 0.1
  }
}
