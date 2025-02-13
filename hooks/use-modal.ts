'use client'

import { create } from 'zustand'
import { DialogProps } from '@mui/material'
import { ReactNode } from 'react'

export interface ModalData {
  id: string
  component: ReactNode
  props?: Omit<DialogProps, 'open' | 'onClose'>
}

interface ModalStore {
  modals: ModalData[]
  openModal: (modal: Omit<ModalData, 'id'>) => string
  closeModal: (id: string) => void
  clearModals: () => void
}

export const useModalStore = create<ModalStore>(set => ({
  modals: [],
  openModal: modalData => {
    const id = Math.random().toString(36).substring(2, 9)
    set(state => ({
      modals: [...state.modals, { ...modalData, id }]
    }))
    return id
  },
  closeModal: id =>
    set(state => ({
      modals: state.modals.filter(modal => modal.id !== id)
    })),
  clearModals: () => set({ modals: [] })
}))
