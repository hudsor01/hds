import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Mock data - replace with actual database query
    const sessions = [
      {
        id: '1',
        device: 'desktop',
        browser: 'Chrome on Windows',
        location: 'New York, US',
        lastActive: new Date(),
        current: true
      },
      {
        id: '2',
        device: 'mobile',
        browser: 'Safari on iPhone',
        location: 'Los Angeles, US',
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
        current: false
      }
    ]

    return NextResponse.json({ sessions })
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to fetch sessions: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}
