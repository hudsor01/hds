export const emailTrackingService = {
 async createPixel(emailId: string) {
   return `${process.env.NEXT_PUBLIC_URL}/api/track/email/${emailId}.png`;
 },

 async logOpen(emailId: string) {
   await sql`
     UPDATE email_events
     SET opened_at = NOW()
     WHERE id = ${emailId}
   `;
 }
};
