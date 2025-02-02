import { Request, Response } from 'express'
import { Webhook } from 'svix'

interface WebhookEvent {
  type: string
  data: {
    id: string
    object: string
    [key: string]: any
  }
}

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET

export async function handleClerkWebhook(req: Request, res: Response): Promise<void> {
  if (!webhookSecret) {
    console.error('Missing CLERK_WEBHOOK_SECRET')
    res.status(500).json({ error: 'Server configuration error' })
    return
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string
  const svix_timestamp = req.headers['svix-timestamp'] as string
  const svix_signature = req.headers['svix-signature'] as string

  // If there are missing headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).json({ error: 'Missing required Svix headers' })
    return
  }

  // Get the body
  const payload = JSON.stringify(req.body)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret)

  try {
    // Verify the webhook payload
    const evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent

    // Handle the webhook
    const { type, data } = evt
    switch (type) {
      case 'user.created':
        // Handle user creation
        console.log('User created:', data)
        break
      case 'user.updated':
        // Handle user update
        console.log('User updated:', data)
        break
      case 'user.deleted':
        // Handle user deletion
        console.log('User deleted:', data)
        break
      // Add more cases as needed
      default:
        console.log(`Unhandled webhook type: ${type}`)
    }

    res.status(200).json({ message: 'Webhook processed successfully' })
  } catch (err) {
    console.error('Error processing webhook:', err)
    res.status(500).json({ error: 'Error processing webhook' })
  }
}
