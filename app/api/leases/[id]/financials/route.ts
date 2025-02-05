import {createClient} from '@supabase/supabase-js';
import {cookies} from 'next/headers';
import {NextResponse} from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function createRouteHandlerClient({cookies: reqCookies}: {cookies: any}) {
  // Create and return the Supabase client instance.
  return createClient(supabaseUrl, supabaseAnonKey);
}

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createRouteHandlerClient({cookies});

    // First verify access to the lease
    const {data: lease, error: leaseError} = await supabase
      .from('leases')
      .select(
        `
        *,
        unit:units (
          *,
          property:properties (
            id,
            organization_id
          )
        )
      `,
      )
      .eq('id', params.id)
      .single();

    if (leaseError || !lease) {
      return NextResponse.json({error: 'Lease not found'}, {status: 404});
    }

    // Calculate lease financials
    const {data: financials, error} = await supabase.rpc('calculate_lease_financials', {
      p_lease_id: params.id,
    });

    if (error) throw error;

    return NextResponse.json({
      lease_details: {
        unit_number: lease.unit.unit_number,
        property_id: lease.unit.property.id,
        start_date: lease.start_date,
        end_date: lease.end_date,
        status: lease.status,
      },
      financials,
    });
  } catch (error) {
    return NextResponse.json({error: 'Error calculating lease financials'}, {status: 500});
  }
}
