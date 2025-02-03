import {WebhookEvent} from '@clerk/clerk-sdk-node';
import {sql} from '@vercel/postgres';
import express from 'express';

const router = express.Router();

// Webhook secret from Clerk Dashboard
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

// Verify webhook signature
const verifyClerkWebhook = (
  req: express.Request,
  res: express.Response,
  next: express.Function,
) => {
  const evt = req.body;
  const headers = req.headers;
  const svix_id = headers['svix-id'] as string;
  const svix_timestamp = headers['svix-timestamp'] as string;
  const svix_signature = headers['svix-signature'] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({error: 'Missing webhook headers'});
  }

  // Verify webhook (implementation depends on your webhook library)
  try {
    // Verify signature here
    next();
  } catch (err) {
    return res.status(401).json({error: 'Invalid webhook signature'});
  }
};

router.post('/webhook', verifyClerkWebhook, async (req, res) => {
  const evt = req.body as WebhookEvent;

  try {
    switch (evt.type) {
      case 'user.created':
        await handleUserCreated(evt.data);
        break;

      case 'user.updated':
        await handleUserUpdated(evt.data);
        break;

      case 'user.deleted':
        await handleUserDeleted(evt.data);
        break;

      case 'organization.created':
        await handleOrgCreated(evt.data);
        break;

      default:
        console.log(`Unhandled webhook type: ${evt.type}`);
    }

    res.json({received: true});
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({error: 'Webhook processing failed'});
  }
});

// Webhook handlers
async function handleUserCreated(data: any) {
  // Create user in your database
  await sql`
   INSERT INTO users (
     clerk_id,
     email,
     first_name,
     last_name,
     created_at
   ) VALUES (
     ${data.id},
     ${data.email_addresses[0].email_address},
     ${data.first_name},
     ${data.last_name},
     NOW()
   )
 `;

  // Create initial settings
  await sql`
   INSERT INTO user_settings (
     user_id,
     notification_preferences
   ) SELECT
     id,
     '{"email": true, "push": true}'::jsonb
   FROM users
   WHERE clerk_id = ${data.id}
 `;
}

async function handleUserUpdated(data: any) {
  await sql`
   UPDATE users
   SET
     email = ${data.email_addresses[0].email_address},
     first_name = ${data.first_name},
     last_name = ${data.last_name},
     updated_at = NOW()
   WHERE clerk_id = ${data.id}
 `;
}

async function handleUserDeleted(data: any) {
  // Soft delete to maintain referential integrity
  await sql`
   UPDATE users
   SET
     deleted_at = NOW(),
     status = 'deleted'
   WHERE clerk_id = ${data.id}
 `;
}

async function handleOrgCreated(data: any) {
  await sql`
   INSERT INTO organizations (
     clerk_org_id,
     name,
     created_at
   ) VALUES (
     ${data.id},
     ${data.name},
     NOW()
   )
 `;
}

// Types for webhook events
interface WebhookUser {
  id: string;
  email_addresses: Array<{
    email_address: string;
    verification: {
      status: string;
    };
  }>;
  first_name: string;
  last_name: string;
  created_at: number;
}
