/**
 * Utilidades para trabajar con Cloudinary
 */

export interface CloudinaryImage {
  publicId: string;
  secureUrl: string;
  url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  createdAt: string;
}

export interface CloudinaryImagesResponse {
  images: CloudinaryImage[];
  total: number;
  next_cursor?: string;
}

/**
 * Obtiene todas las imágenes de Cloudinary
 * @param folder - Carpeta opcional para filtrar imágenes
 * @param maxResults - Número máximo de resultados (default: 50)
 * @returns Promise con las imágenes
 */
export async function getCloudinaryImages(
  folder?: string,
  maxResults: number = 50
): Promise<CloudinaryImagesResponse> {
  try {
    const params = new URLSearchParams({
      max_results: maxResults.toString(),
    });

    if (folder) {
      params.append("folder", folder);
    }

    const response = await fetch(`/api/cloudinary-images?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error);
    throw error;
  }
}

/**
 * Obtiene la URL optimizada de una imagen de Cloudinary
 * @param publicId - ID público de la imagen en Cloudinary
 * @param transformations - Transformaciones opcionales (width, height, crop, etc.)
 * @returns URL optimizada
 */
export function getCloudinaryUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: number;
    format?: string;
  }
): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  
  if (!cloudName) {
    throw new Error("Cloudinary cloud name not configured");
  }

  let url = `https://res.cloudinary.com/${cloudName}/image/upload`;

  if (transformations) {
    const transforms: string[] = [];
    
    if (transformations.width) transforms.push(`w_${transformations.width}`);
    if (transformations.height) transforms.push(`h_${transformations.height}`);
    if (transformations.crop) transforms.push(`c_${transformations.crop}`);
    if (transformations.quality) transforms.push(`q_${transformations.quality}`);
    if (transformations.format) transforms.push(`f_${transformations.format}`);

    if (transforms.length > 0) {
      url += `/${transforms.join(",")}`;
    }
  }

  url += `/${publicId}`;

  return url;
}

