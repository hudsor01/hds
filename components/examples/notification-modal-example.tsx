'use client'

import { Button } from '@mui/material'
import { useToast } from '@/hooks/use-toast'
import { useModalStore } from '@/hooks/use-modal'
import { Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material'
import { useState } from 'react'

async function simulateAsyncOperation() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (Math.random() > 0.7) {
    throw new Error('Simulated error')
  }
  return { success: true }
}

function ModalContent({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleAction = async () => {
    setLoading(true)
    try {
      await simulateAsyncOperation()
      toast({
        type: 'success',
        title: 'Success',
        description: 'Operation completed successfully'
      })
    } catch (error) {
      toast({
        type: 'error',
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DialogTitle>Test Modal</DialogTitle>
      <DialogContent>{loading ? <CircularProgress /> : <div>Modal Content</div>}</DialogContent>
      <DialogActions>
        <Button onClick={handleAction}>Trigger Action</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  )
}

export function ExampleUsage() {
  const { toast } = useToast()
  const openModal = useModalStore(state => state.openModal)

  const handleShowToast = () => {
    toast({
      title: 'Hello',
      description: 'This is an animated toast notification'
    })
  }

  const handleOpenModal = () => {
    const id = openModal({
      component: <ModalContent onClose={() => useModalStore.getState().closeModal(id)} />
    })
  }

  return (
    <div>
      <Button onClick={handleShowToast}>Show Toast</Button>
      <Button onClick={handleOpenModal}>Open Modal</Button>
    </div>
  )
}
