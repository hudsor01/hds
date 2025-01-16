import type { JWTPayload } from 'jose'

export type SessionPayload = JWTPayload & {
  user: {
    id: string
    email: string
    name: string | null
  }
}
