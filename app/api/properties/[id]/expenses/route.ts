import {createClient} from '@supabase/supabase-js';
import {NextResponse} from 'next/server';

export async function GET(request: Request, {params}: {params: {id: string}}) {
  try {
    const {searchParams} = new URL(request.url);
    const startDate =
      searchParams.get('startDate') || new Date(new Date().getFullYear(), 0, 1).toISOString();
    const endDate = searchParams.get('endDate') || new Date().toISOString();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    // First verify access to the property
    const {data: property, error: propertyError} = await supabase
      .from('properties')
      .select('id, organization_id')
      .eq('id', params.id)
      .single();

    if (propertyError || !property) {
      return NextResponse.json({error: 'Property not found'}, {status: 404});
    }

    // Calculate expenses
    const {data: expenses, error: expensesError} = await supabase.rpc(
      'calculate_property_expenses',
      {
        p_property_id: params.id,
        p_start_date: startDate,
        p_end_date: endDate,
      },
    );

    if (expensesError) throw expensesError;

    // Calculate expense metrics
    const {data: metrics, error: metricsError} = await supabase.rpc('calculate_expense_metrics', {
      p_property_id: params.id,
      p_start_date: startDate,
      p_end_date: endDate,
    });

    if (metricsError) throw metricsError;

    // Calculate current month's profit/loss
    const currentDate = new Date();
    const {data: profitLoss, error: plError} = await supabase.rpc('calculate_profit_loss', {
      p_property_id: params.id,
      p_year: currentDate.getFullYear(),
      p_month: currentDate.getMonth() + 1,
    });

    if (plError) throw plError;

    return NextResponse.json({
      expenses,
      metrics,
      current_month_pl: profitLoss,
    });
  } catch (error) {
    return NextResponse.json({error: 'Error calculating property expenses'}, {status: 500});
  }
}

export async function POST(request: Request, {params}: {params: {id: string}}) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const json = await request.json();

    // First verify access to the property
    const {data: property, error: propertyError} = await supabase
      .from('properties')
      .select('id, organization_id')
      .eq('id', params.id)
      .single();

    if (propertyError || !property) {
      return NextResponse.json({error: 'Property not found'}, {status: 404});
    }

    // Create new expense
    const {data: expense, error} = await supabase
      .from('expenses')
      .insert([
        {
          property_id: params.id,
          unit_id: json.unit_id,
          category: json.category,
          amount: json.amount,
          date: json.date,
          description: json.description,
          status: json.status || 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({error: 'Error creating expense'}, {status: 500});
  }
}
