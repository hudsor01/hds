import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const userId = req.headers.get('x-user-id')
    if (!userId)
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )

    const user = await db.users.getCurrentUser(params.id)
    const role = user.privateMetadata?.role || 'USER'

    return NextResponse.json({ role })
}
