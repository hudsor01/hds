import { users } from '@prisma/client'
import { Request } from 'express'

export interface CustomRequest extends Omit<Request, 'user'> {
  user?: users
}
