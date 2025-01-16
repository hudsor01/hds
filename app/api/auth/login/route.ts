import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // TODO: Replace with your actual authentication logic
    if (email === 'test@example.com' && password === 'password') {
      // Create session or token
      return NextResponse.json({
        success: true,
        user: { id: 1, email }
      })
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
