import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createRouteHandlerClient({cookies});

    const {data: property, error} = await supabase
      .from('properties')
      .select(
        `
        *,
        units (*)
      `,
      )
      .eq('id', params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({error: 'Error fetching property'}, {status: 500});
  }
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createRouteHandlerClient({cookies});
    const json = await request.json();

    const {data: property, error} = await supabase
      .from('properties')
      .update(json)
      .eq('id', params.id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({error: 'Error updating property'}, {status: 500});
  }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createRouteHandlerClient({cookies});

    const {error} = await supabase.from('properties').delete().eq('id', params.id);

    if (error) throw error;

    return new NextResponse(null, {status: 204});
  } catch (error) {
    return NextResponse.json({error: 'Error deleting property'}, {status: 500});
  }
}
