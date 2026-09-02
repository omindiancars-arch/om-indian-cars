/**
 * Utility to compress images and convert them into lightweight WebP/JPEG formats
 * to reduce bandwidth/egress and provide fallback data URLs when storage is restricted.
 */

export async function compressImageFile(
  file: File,
  maxWidth = 1600,
  maxHeight = 1200,
  quality = 0.75
): Promise<{ file: File; dataUrl: string }> {
  // If not an image, return original file
  if (!file.type.startsWith('image/')) {
    const dataUrl = await fileToDataUrl(file);
    return { file, dataUrl };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          const fallbackUrl = (event.target?.result as string) || '';
          resolve({ file, dataUrl: fallbackUrl });
          return;
        }

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Try converting to WebP, fallback to JPEG
        let mimeType = 'image/webp';
        let dataUrl = canvas.toDataURL(mimeType, quality);

        // If browser doesn't support WebP export, fallback to JPEG
        if (!dataUrl.startsWith('data:image/webp')) {
          mimeType = 'image/jpeg';
          dataUrl = canvas.toDataURL(mimeType, quality);
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({ file, dataUrl });
              return;
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, "") + (mimeType === 'image/webp' ? '.webp' : '.jpg');
            const compressedFile = new File([blob], cleanFileName, {
              type: mimeType,
              lastModified: Date.now(),
            });

            resolve({ file: compressedFile, dataUrl });
          },
          mimeType,
          quality
        );
      };

      img.onerror = () => {
        const fallbackUrl = (event.target?.result as string) || '';
        resolve({ file, dataUrl: fallbackUrl });
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      resolve({ file, dataUrl: '' });
    };

    reader.readAsDataURL(file);
  });
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
