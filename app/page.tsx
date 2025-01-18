import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: properties } = await supabase.from('properties').select()

  return (
    <ul className="space-y-4">
      {properties?.map((property) => (
        <li key={property.id} className="p-4 bg-white rounded shadow">
          <h3 className="font-bold">{property.name}</h3>
          <p>{property.address}</p>
          <p>{property.city}, {property.state} {property.zip_code}</p>
          <p>Type: {property.type}</p>
          <p>Status: {property.status}</p>
        </li>
      ))}
    </ul>
  )
}
