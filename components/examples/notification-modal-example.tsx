'use client'

import { useToast } from '@/hooks/use-toast'
import { useModalStore } from '@/hooks/use-modal'
import { withModalLoading } from '@/components/ui/with-modal-loading'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { useState } from 'react'

async function simulateAsyncOperation() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  if (Math.random() > 0.7) {
    throw new Error('Simulated error')
  }
  return { data: 'Success!' }
}

function ExampleModalContent({ onClose }: { onClose: () => void }) {
  const [data, setData] = useState<string>()
  const { toast } = useToast()

  const handleAction = async () => {
    try {
      const result = await simulateAsyncOperation()
      setData(result.data)
      toast({
        title: 'Success',
        description: 'Operation completed successfully',
        type: 'success'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        type: 'error'
      })
    }
  }

  return (
    <>
      <DialogTitle>Example Modal</DialogTitle>
      <DialogContent>
        <p>This modal demonstrates loading states and error handling</p>
        {data && <p>Result: {data}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAction} variant="contained" color="primary">
          Trigger Action
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  )
}

const LoadingModalContent = withModalLoading(ExampleModalContent)

export function ExampleUsage() {
  const { toast } = useToast()
  const openModal = useModalStore(state => state.openModal)

  const handleShowToast = () => {
    toast({
      title: 'Hello',
      description: 'This is an animated toast notification',
      type: 'info'
    })
  }

  const handleOpenModal = () => {
    const id = openModal({
      component: <LoadingModalContent onClose={() => useModalStore.getState().closeModal(id)} />,
      props: {
        maxWidth: 'sm',
        fullWidth: true
      }
    })
  }

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button onClick={handleShowToast} variant="contained" color="primary">
        Show Toast
      </Button>
      <Button onClick={handleOpenModal} variant="contained" color="secondary">
        Open Modal
      </Button>
    </div>
  )
}
