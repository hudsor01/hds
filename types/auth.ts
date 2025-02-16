import { type RedirectType } from 'next/navigation'

export type MessageType = 'success' | 'error' | 'info' | 'warning'

export type RedirectFunction = (
  type: MessageType,
  path: string,
  message: string
) => {
  status: number
  redirect: true
  type: RedirectType
  destination: string
}

export interface AuthError {
  code: string
  message: string
  status?: number
}