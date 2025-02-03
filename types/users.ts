import {Users} from '@prisma/client';

export interface CustomRequest extends Express.Request {
  user?: Users;
}
