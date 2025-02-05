import {createClient} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {data: maintenanceRequest, error} = await supabase
      .from('maintenance_requests')
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

    return NextResponse.json(maintenanceRequest);
  } catch (error) {
    return NextResponse.json({error: 'Error fetching maintenance request'}, {status: 500});
  }
}

export async function PATCH(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const json = await request.json();

    // If completing the request, set completed_at
    if (json.status === 'completed' && !json.completed_at) {
      json.completed_at = new Date().toISOString();
    }

    const {data: maintenanceRequest, error} = await supabase
      .from('maintenance_requests')
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

    return NextResponse.json(maintenanceRequest);
  } catch (error) {
    return NextResponse.json({error: 'Error updating maintenance request'}, {status: 500});
  }
}

export async function DELETE(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {error} = await supabase.from('maintenance_requests').delete().eq('id', params.id);

    if (error) throw error;

    return new NextResponse(null, {status: 204});
  } catch (error) {
    return NextResponse.json({error: 'Error deleting maintenance request'}, {status: 500});
  }
}
