'use client'

export const listAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.2
    }
  }),
  exit: { opacity: 0, y: -20 }
}

export const dataUpdateAnimation = {
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

export const tabPanelAnimation = {
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

export const chartAnimation = {
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

export const filterAnimation = {
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

export const notificationAnimation = {
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
