import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function uploadFile(file: File, bucket: string, path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).upload(`${path}/${file.name}`, file)

  if (error) {
    throw new Error(error.message)
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl.publicUrl
}
