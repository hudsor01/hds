import { sql } from '@vercel/postgres'

export const emailTrackingService = {
  createPixel(emailId: string) {
    const baseUrl = process.env['NEXT_PUBLIC_URL']
    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_URL is not defined in environment variables')
    }
    return `${baseUrl}/api/track/email/${emailId}.png`
  },

  async logOpen(emailId: string) {
    await sql`
     UPDATE email_events
     SET opened_at = NOW()
     WHERE id = ${emailId}
   `
  }
}
