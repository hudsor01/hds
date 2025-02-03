import {NextResponse} from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'HDS API',
    version: '1.0.0',
  });
}
