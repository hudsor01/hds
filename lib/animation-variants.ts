import { TargetAndTransition, Variant } from 'framer-motion'

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

export const fadeInOut: Record<string, Variant> = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.1
    }
  }
}

export const slideInOut: Record<string, Variant> = {
  hidden: {
    x: 50,
    opacity: 0
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
}

export const modalVariants: Record<string, Variant> = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -20
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
    y: 20,
    transition: {
      duration: 0.2
    }
  }
}

export const overlayVariants: Record<string, Variant> = {
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
