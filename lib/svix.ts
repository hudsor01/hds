import { Webhook } from 'svix'
import process from 'process'

export const webhook = new Webhook(process.env.SVIX_SECRET)
