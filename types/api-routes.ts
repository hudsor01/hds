// types/api-routes.ts
import { NextRequest } from 'next/server'

// Waitlist API Routes
export interface WaitlistPostRequest extends NextRequest {
 body: {
   email: string;
   source?: string;
   referralCode?: string;
 }
}

export interface WaitlistResponse {
 success: boolean;
 data?: {
   id: string;
   email: string;
   position: number;
   createdAt: Date;
 };
 error?: string;
}

// Email API Routes
export interface EmailSendRequest extends NextRequest {
 body: {
   templateId: string;
   waitlistIds: string[];
   metadata?: Record<string, any>;
 }
}

export interface EmailTrackingRequest extends NextRequest {
 params: {
   eventId: string;
   type: 'open' | 'click';
 }
}

// Analytics API Routes
export interface AnalyticsRequest extends NextRequest {
 query: {
   startDate?: string;
   endDate?: string;
   template?: string;
 }
}

// Example implementation:
// app/api/waitlist/route.ts
import { type WaitlistPostRequest, type WaitlistResponse } from '@/types/api-routes'

export async function POST(
 request: WaitlistPostRequest
): Promise<Response> {
 try {
   const { email, source, referralCode } = await request.json()

   const entry = await waitlistDB.add({
     email,
     source,
     referralCode
   })

   const response: WaitlistResponse = {
     success: true,
     data: {
       id: entry.id,
       email: entry.email,
       position: entry.position,
       createdAt: entry.createdAt
     }
   }

   return Response.json(response)
 } catch (error) {
   const response: WaitlistResponse = {
     success: false,
     error: 'Failed to join waitlist'
   }
   return Response.json(response, { status: 500 })
 }
}

// app/api/analytics/route.ts
export async function GET(
 request: AnalyticsRequest
): Promise<Response> {
 const { searchParams } = new URL(request.url)
 const startDate = searchParams.get('startDate')
 const endDate = searchParams.get('endDate')
 const template = searchParams.get('template')

 const stats = await analyticsDB.getStats({
   startDate: startDate ? new Date(startDate) : undefined,
   endDate: endDate ? new Date(endDate) : undefined,
   template
 })

 return Response.json({ success: true, data: stats })
}
