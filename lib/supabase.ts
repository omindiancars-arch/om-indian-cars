import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing! Check Vercel Environment Variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadFile = async (file: File, path: string) => {
  const sanitizedPath = path.replace(/[^a-zA-Z0-9._-]/g, '_');
  const { data, error } = await supabase.storage
    .from('car-assets')
    .upload(sanitizedPath, file, {
      cacheControl: '3600',
      contentType: file.type || undefined,
      upsert: true
    });

  if (error) {
    console.error("Supabase storage upload error:", error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('car-assets')
    .getPublicUrl(data.path);

  return publicUrl;
};

