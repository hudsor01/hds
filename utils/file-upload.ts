import { supabase } from '@/lib/supabase/auth'

export async function uploadFile(
    file: File,
    bucket: string,
    path: string
): Promise<string> {
    const { data, error } = await supabase.storage
        .from(bucket)
        .upload(`${path}/${file.name}`, file)

    if (error) {
        throw new Error(error.message)
    }

    const { data: publicUrl } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

    return publicUrl.publicUrl
}
