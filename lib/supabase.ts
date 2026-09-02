import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing! Check Vercel Environment Variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import { compressImageFile } from './imageUtils';

export const uploadFile = async (file: File, path: string): Promise<string> => {
  let fileToUpload = file;
  let compressedDataUrl = '';

  // 1. Client-side compression & format conversion (WebP/JPEG)
  if (typeof window !== 'undefined' && file.type.startsWith('image/')) {
    try {
      const compressionResult = await compressImageFile(file, 1600, 1200, 0.75);
      fileToUpload = compressionResult.file;
      compressedDataUrl = compressionResult.dataUrl;
    } catch (e) {
      console.warn("Client-side compression skipped:", e);
    }
  }

  const sanitizedPath = path.replace(/[^a-zA-Z0-9._-]/g, '_');

  try {
    const { data, error } = await supabase.storage
      .from('car-assets')
      .upload(sanitizedPath, fileToUpload, {
        cacheControl: '3600',
        contentType: fileToUpload.type || undefined,
        upsert: true
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('car-assets')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error: any) {
    console.warn("Supabase storage upload failed (e.g. egress quota limit or restricted bucket). Using converted optimized data fallback:", error?.message || error);
    
    // 2. If storage egress is restricted or quota exceeded, fallback to compressed data URL
    if (compressedDataUrl) {
      return compressedDataUrl;
    }

    // Try converting file directly to dataUrl
    if (typeof window !== 'undefined') {
      try {
        const { fileToDataUrl } = await import('./imageUtils');
        const directDataUrl = await fileToDataUrl(file);
        return directDataUrl;
      } catch (e) {}
    }

    throw error;
  }
};


