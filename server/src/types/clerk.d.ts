import {WebhookEvent as ClerkWebhookEvent} from '@clerk/backend/dist/webhook';

declare global {
  type WebhookEvent = ClerkWebhookEvent;
}

export {};
