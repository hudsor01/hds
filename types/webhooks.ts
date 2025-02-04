export interface WebhookLog {
  id: string;
  event_type: string;
  created_at: string;
  success: boolean;
  payload: string;
}

export interface WebhookPayload {
  type: string;
  data: Record<string, unknown>;
  object: string;
  created_at: string;
}

export type WebhookEventType =
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'session.created'
  | 'session.ended'
  | 'organization.created'
  | 'organization.updated'
  | 'organization.deleted';

export interface WebhookLogGridProps {
  logs: WebhookLog[];
}
