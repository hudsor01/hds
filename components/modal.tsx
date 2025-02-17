'use client'

import { Dialog, DialogProps, useTheme, styled, Backdrop, Paper, IconButton, Box, type Theme } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { ReactNode, createContext, useContext, useCallback } from 'react'
import { useModalStore } from '@/hooks/use-modal'
import { AnimatePresence, motion } from 'framer-motion'

// Types
interface ModalProviderProps {
  children: ReactNode
}

interface ModalConfig {
  id: string
  component: ReactNode
  props?: Omit<DialogProps, 'open' | 'onClose'>
}

// Styled components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: theme.shape.borderRadius * 1.5,
    boxShadow: theme.shadows[3],
    border: `1px solid ${theme.palette.divider}`,
    padding: 0,
    margin: theme.spacing(2),
    maxHeight: `calc(100% - ${theme.spacing(4)})`,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      width: `calc(100% - ${theme.spacing(4)})`
    }
  }
}))

const MotionPaper = motion(Paper)

// Animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.15,
      ease: 'easeIn'
    }
  }
}

// Context
export const ModalContext = createContext<ReturnType<typeof useModalStore> | null>(null)

// Hooks
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

// Helper function to get modal styles based on size
const getModalStyles = (theme: Theme, size?: DialogProps['maxWidth']) => {
  const baseStyles = {
    position: 'relative',
    borderRadius: theme.shape.borderRadius * 1.5,
    backgroundColor: theme.palette.background.paper,
    backgroundImage: 'none'
  }

  const sizeMap = {
    xs: { maxWidth: 444 },
    sm: { maxWidth: 600 },
    md: { maxWidth: 800 },
    lg: { maxWidth: 1200 },
    xl: { maxWidth: 1536 }
  }

  return {
    ...baseStyles,
    ...(size && sizeMap[size])
  }
}

// Main component
export function ModalProvider({ children }: ModalProviderProps) {
  const modalStore = useModalStore()
  const theme = useTheme()

  const handleClose = useCallback(
    (id: string) => {
      modalStore.closeModal(id)
    },
    [modalStore]
  )

  return (
    <ModalContext.Provider value={modalStore}>
      {children}
      <AnimatePresence>
        {modalStore.modals.map(({ id, component, props }: ModalConfig) => (
          <StyledDialog
            key={id}
            open={true}
            onClose={() => {
              handleClose(id)
            }}
            maxWidth={props?.maxWidth || 'sm'}
            fullWidth={props?.fullWidth !== false}
            {...props}
            PaperComponent={undefined}
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 200,
              sx: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)'
              }
            }}
          >
            <MotionPaper
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              sx={getModalStyles(theme, props?.maxWidth)}
            >
              {/* Close button */}
              {!props?.hideCloseButton && (
                <IconButton
                  onClick={() => {
                    handleClose(id)
                  }}
                  sx={{
                    position: 'absolute',
                    right: theme.spacing(2),
                    top: theme.spacing(2),
                    zIndex: 1,
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                  size="small"
                  aria-label="close modal"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}

              {/* Modal content */}
              <Box
                sx={{
                  height: '100%',
                  overflow: 'auto',
                  p: theme.spacing(3),
                  ...(props?.hideCloseButton ? {} : { pt: theme.spacing(6) })
                }}
              >
                {component}
              </Box>
            </MotionPaper>
          </StyledDialog>
        ))}
      </AnimatePresence>
    </ModalContext.Provider>
  )
}

// Export types for better DX
export type { ModalConfig, ModalProviderProps }

// Export styled components for reuse
export { StyledDialog, MotionPaper }

// Export animation variants for reuse
export const modalAnimations = {
  variants: modalVariants,
  transition: {
    duration: 0.2,
    ease: 'easeInOut'
  }
}
