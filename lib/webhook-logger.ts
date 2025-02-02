export const logWebhookEvent = async (
 type: string,
 data: any,
 success: boolean,
 error?: any
) => {
 await sql`
   INSERT INTO webhook_logs (
     event_type,
     payload,
     success,
     error,
     created_at
   ) VALUES (
     ${type},
     ${JSON.stringify(data)},
     ${success},
     ${JSON.stringify(error)},
     NOW()
   )
 `
}
