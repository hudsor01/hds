import { NextRequest, NextResponse } from 'next/server';
import analyticsDB from '../types/analyticsDB';
import waitlistDB from '../types/waitlistDB';
// Waitlist API Routes
export interface WaitlistPostRequest extends NextRequest {
  body: ReadableStream<Uint8Array<ArrayBufferLike>> & {
    email: string;
    source?: string;
    referralCode?: string;
  };
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
export interface EmailSendRequest extends Omit<NextRequest, 'body'> {
  body: {
    templateId: string;
    waitlistIds: string[];
    metadata?: Record<string, any>;
  };
}

export interface EmailTrackingRequest extends NextRequest {
  params: {
    eventId: string;
    type: 'open' | 'click';
  };
}

// Analytics API Routes
export interface AnalyticsRequest extends NextRequest {
  query: {
    startDate?: string;
    endDate?: string;
    template?: string;
  };
}

// Helper: function for stubbed methods
const notImplemented = () => {
  throw new Error('Function not implemented.');
};

const defaultStringMethods = {
  charAt: notImplemented,
  charCodeAt: notImplemented,
  concat: notImplemented,
  indexOf: notImplemented,
  lastIndexOf: notImplemented,
  localeCompare: notImplemented,
  match: notImplemented,
  replace: notImplemented,
  search: notImplemented,
  slice: notImplemented,
  split: notImplemented,
  substring: notImplemented,
  toLowerCase: notImplemented,
  toLocaleLowerCase: notImplemented,
  toUpperCase: notImplemented,
  toLocaleUpperCase: notImplemented,
  trim: notImplemented,
  substr: notImplemented,
  codePointAt: notImplemented,
  includes: notImplemented,
  endsWith: notImplemented,
  normalize: notImplemented,
  repeat: notImplemented,
  startsWith: notImplemented,
  anchor: notImplemented,
  big: notImplemented,
  blink: notImplemented,
  bold: notImplemented,
  fixed: notImplemented,
  fontcolor: notImplemented,
  fontsize: notImplemented,
  italics: notImplemented,
  link: notImplemented,
  small: notImplemented,
  strike: notImplemented,
  sub: notImplemented,
  sup: notImplemented,
  padStart: notImplemented,
  padEnd: notImplemented,
  trimEnd: notImplemented,
  trimStart: notImplemented,
  trimLeft: notImplemented,
  trimRight: notImplemented,
  matchAll: notImplemented,
  replaceAll: notImplemented,
  at: notImplemented,
  isWellFormed: notImplemented,
  toWellFormed: notImplemented,
  [Symbol.iterator]: notImplemented,
  length: 0,
};

export async function POST(request: WaitlistPostRequest): Promise<Response> {
  try {
    const { email, source, referralCode } = await request.json();

    // Use object spread to include the default string methods
    const entry = await waitlistDB.add({
      email,
      source,
      referralCode,
      ...defaultStringMethods,
    } as any);

    const response: WaitlistResponse = {
      success: true,
      data: {
        id: entry.id,
        email: entry.email,
        position: entry.position,
        createdAt: entry.createdAt,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: WaitlistResponse = {
      success: false,
      error: 'Failed to join waitlist',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

// app/api/analytics/route.ts
export async function GET(request: AnalyticsRequest): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');
  const template = searchParams.get('template') || undefined;

  const stats = await analyticsDB.getStats({
    startDate: startDate ? new Date(startDate) : undefined,
    endDate: endDate ? new Date(endDate) : undefined,
    template,
  });

  return Response.json({ success: true, data: stats });
}
