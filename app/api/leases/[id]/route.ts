import {createClient} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {data: lease, error} = await supabase
      .from('leases')
      .select(
        `
        *,
        unit:units (
          *,
          property:properties (*)
        ),
        tenant:tenants (*)
      `,
      )
      .eq('id', params.id)
      .single();

    if (error) throw error;

    return NextResponse.json(lease);
  } catch (error) {
    return NextResponse.json({error: 'Error fetching lease'}, {status: 500});
  }
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const json = await request.json();

    // Ensure dates are in ISO format
    if (json.start_date) json.start_date = new Date(json.start_date).toISOString();
    if (json.end_date) json.end_date = new Date(json.end_date).toISOString();

    const {data: lease, error} = await supabase
      .from('leases')
      .update(json)
      .eq('id', params.id)
      .select(
        `
        *,
        unit:units (
          *,
          property:properties (*)
        ),
        tenant:tenants (*)
      `,
      )
      .single();

    if (error) throw error;

    return NextResponse.json(lease);
  } catch (error) {
    return NextResponse.json({error: 'Error updating lease'}, {status: 500});
  }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {error} = await supabase.from('leases').delete().eq('id', params.id);

    if (error) throw error;

    return new NextResponse(null, {status: 204});
  } catch (error) {
    return NextResponse.json({error: 'Error deleting lease'}, {status: 500});
  }
}
