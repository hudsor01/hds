import supabase from '@/utils/supabase/client'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export async function uploadFile(file: File, bucket: string, path: string): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).upload(`${path}/${file.name}`, file)

  if (error) {
    throw new Error(error.message)
  }

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl.publicUrl
}
