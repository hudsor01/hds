import { Webhook } from 'svix'

export const webhook = new Webhook(process.env.SVIX_SECRET)
