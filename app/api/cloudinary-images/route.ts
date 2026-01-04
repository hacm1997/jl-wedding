import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configurar Cloudinary con las credenciales
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder") || "";
    const maxResults = parseInt(searchParams.get("max_results") || "50");

    // Verificar que las credenciales estén configuradas
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary credentials not configured" },
        { status: 500 }
      );
    }

    // Configurar opciones base
    const options: any = {
      resource_type: "image" as const,
      type: "upload",
      max_results: maxResults > 500 ? 500 : maxResults, // Cloudinary tiene límites
    };

    // Obtener todas las imágenes primero
    let result = await cloudinary.api.resources(options);

    // Si se especificó un folder, filtrar las imágenes
    if (folder) {
      const normalizedFolder = folder.replace(/^\/+|\/+$/g, '');
      
      // Filtrar por dos métodos:
      // 1. Por prefix en el public_id (ej: "wedding/uploads/nombre")
      // 2. Por el campo folder en los metadatos (si existe)
      if (result.resources && result.resources.length > 0) {
        result.resources = result.resources.filter((resource: any) => {
          const publicId = resource.public_id || '';
          const resourceFolder = resource.folder || '';
          
          // Verificar si el public_id incluye la carpeta
          const publicIdMatches = publicId.startsWith(normalizedFolder + '/');
          
          // Verificar si el campo folder coincide
          const folderMatches = resourceFolder === normalizedFolder || 
                               resourceFolder === normalizedFolder + '/' ||
                               resourceFolder.startsWith(normalizedFolder + '/');
          
          return publicIdMatches || folderMatches;
        });
      }
    }

    // Formatear las imágenes para que sean más fáciles de usar
    const images = result.resources?.map((resource: any) => ({
      publicId: resource.public_id,
      secureUrl: resource.secure_url,
      url: resource.url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
      bytes: resource.bytes,
      createdAt: resource.created_at,
    })) || [];

    return NextResponse.json({
      images,
      total: images.length,
      next_cursor: result.next_cursor,
    });
  } catch (error: any) {
    console.error("Error fetching Cloudinary images:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch images from Cloudinary",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

