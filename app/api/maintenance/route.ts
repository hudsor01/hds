import {createClient} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const {data: requests, error} = await supabase
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
      .order('created_at', {ascending: false});

    if (error) throw error;

    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({error: 'Error fetching maintenance requests'}, {status: 500});
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const json = await request.json();

    const {data: maintenanceRequest, error} = await supabase
      .from('maintenance_requests')
      .insert([json])
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
    return NextResponse.json({error: 'Error creating maintenance request'}, {status: 500});
  }
}
