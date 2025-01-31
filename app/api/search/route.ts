import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  return NextResponse.json({
    query,
    type,
    results: [], // Will be populated with actual search results
  });
}