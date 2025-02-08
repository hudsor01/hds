import { NextResponse } from 'next/server';

export async function GET(req: Request, {params}: {params: {id: string}}) {
  const {userId} = await auth();
  if (!userId) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  const user = await .users.getUser(params.id);
  const role = user.privateMetadata?.role || 'USER';

  return NextResponse.json({role});
}
