"use client";

import { useEffect, useState } from "react";
import { getCloudinaryImages, type CloudinaryImage } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";

/**
 * Componente de ejemplo que muestra cómo obtener y mostrar imágenes de Cloudinary
 * 
 * Para usar este componente:
 * 1. Asegúrate de tener las variables de entorno configuradas:
 *    - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
 *    - CLOUDINARY_API_KEY
 *    - CLOUDINARY_API_SECRET
 * 
 * 2. Opcionalmente, puedes pasar un folder para filtrar imágenes de una carpeta específica
 */
export default function CloudinaryGalleryExample({
  folder,
}: {
  folder?: string;
}) {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Cargar imágenes cuando cambia el folder o el refreshKey
  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const data = await getCloudinaryImages(folder, 50);
        setImages(data.images || []);
        setError(null);
      } catch (err) {
        setError("Error al cargar las imágenes");
        console.error("Error al obtener imágenes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [folder, refreshKey]);

  // Escuchar el evento de nuevas imágenes subidas
  useEffect(() => {
    const handleImagesUploaded = () => {
      // Esperar un poco para que Cloudinary procese las imágenes
      setTimeout(() => {
        setRefreshKey(prev => prev + 1);
      }, 1000);
    };

    window.addEventListener('cloudinary:imagesUploaded', handleImagesUploaded);

    return () => {
      window.removeEventListener('cloudinary:imagesUploaded', handleImagesUploaded);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-600">Cargando imágenes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-600">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((image) => (
        <div 
          key={image.publicId} 
          className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100"
        >
          <CldImage
            src={image.publicId}
            alt={`Imagen ${image.publicId}`}
            width={400}
            height={400}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

