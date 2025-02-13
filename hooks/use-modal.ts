'use client'

import { create } from 'zustand'
import type { ModalStore, ModalConfig } from '@/types/animation'

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
