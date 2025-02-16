import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { PropertyType, PropertyStatus } from '@/types/property'

const propertyQuerySchema = z.object({
  limit: z.string().optional(),
  offset: z.string().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  search: z.string().optional(),
})

const createPropertySchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  propertyType: z.nativeEnum(PropertyType),
  units: z.number().min(1, 'Number of units is required'),
  squareFootage: z.number().min(1, 'Square footage is required'),
  yearBuilt: z.number().min(1800, 'Valid year is required'),
  purchasePrice: z.number().min(0, 'Purchase price is required'),
  currentValue: z.number().min(0, 'Current value is required'),
  monthlyRent: z.number().min(0, 'Monthly rent is required'),
  expenses: z.object({
    mortgage: z.number().optional(),
    insurance: z.number().min(0, 'Insurance amount is required'),
    propertyTax: z.number().min(0, 'Property tax is required'),
    utilities: z.number().min(0, 'Utilities amount is required'),
    maintenance: z.number().min(0, 'Maintenance amount is required'),
    other: z.number().min(0, 'Other expenses amount is required'),
  }),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const validatedParams = propertyQuerySchema.parse(Object.fromEntries(searchParams))
    
    const supabase = createClient()
    let query = supabase
      .from('properties')
      .select('*, maintenance_requests(*)', { count: 'exact' })

    if (validatedParams.status) {
      query = query.eq('status', validatedParams.status)
    }

    if (validatedParams.type) {
      query = query.eq('property_type', validatedParams.type)
    }

    if (validatedParams.search) {
      query = query.or(`name.ilike.%${validatedParams.search}%,address.ilike.%${validatedParams.search}%`)
    }

    if (validatedParams.limit) {
      query = query.limit(parseInt(validatedParams.limit))
    }

    if (validatedParams.offset) {
      query = query.offset(parseInt(validatedParams.offset))
    }

    const { data, error, count } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ data, count })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const validatedData = createPropertySchema.parse(json)

    const supabase = createClient()
    const { data, error } = await supabase
      .from('properties')
      .insert([
        {
          ...validatedData,
          status: PropertyStatus.ACTIVE,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation Error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}