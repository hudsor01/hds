import { supabase } from '@/lib/supabase/auth'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const user = await currentUser()
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return new NextResponse('No file provided', { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = `${user.id}/${new Date().getTime()}_${file.name}`
    const { data, error } = await supabase.storage.from('property-documents').upload(path, buffer, {
      contentType: file.type,
      upsert: true
    })

    if (error) {
      console.error('Supabase storage error:', error)
      return new NextResponse('Upload failed', { status: 500 })
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from('property-documents').getPublicUrl(path)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('POST /api/upload error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
